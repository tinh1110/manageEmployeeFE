import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import {
  Space,
  Button,
  Modal,
  Table,
  message,
  Spin,
  Form,
  Select,
  notification,
} from 'antd'
import ModalRemove from './ModalRemove'
import axiosInstance from '../../services/request/base'
import SelectOption from '../../components/teams/SelectOption'
import { User } from '../../components/teams/interface'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../../components/layouts/main'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import {
  TEAM_ADD_MEMBER,
  TEAM_DELETE_MEMBER,
} from '../../libs/constants/Permissions'
import { LIST_POSITION_PROJECT } from '../../libs/constants/Options'
import { type } from '@testing-library/user-event/dist/type'
import { addMember, removeMember } from '../../services/request/team'
const permissionsInfo = getPermissions()

const ListMemberOfTeam = () => {
  const [listUser, setListUser] = useState<User[]>([])
  const [showModalAddMem, setShowModalAddMem] = useState<boolean>(false)
  const [showModalDeleteMem, setShowModalDeleteMem] = useState<boolean>(false)
  const blog: string = 'Are you sure to delete member?'
  const [listAllUser, setListAllUser] = useState<User[]>([])
  const [filter, setFilter] = useState({
    search: '',
  })
  const [newMem, setNewMem] = useState<any>()
  const [chooseUserToAt, setChooseUserToAt] = useState<number[]>([])
  const { id } = useParams()
  const teamId = id
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    getInfoTeam()
    getListMember()
  }, [teamId])

  useEffect(() => {
    getAllUserVer2()
  }, [])
  const handleChangeValue = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const getListMember = async () => {
    const res = await axiosInstance.get(`/team/get-list-user-of-team/${teamId}`)
    setListUser(res.data.data.records)
    setIsLoading(false)
  }
  const [formData, setFormData] = useState({
    user_id: '',
    position_id: '',
  })

  const getAllUser = async () => {
    const url = new URLSearchParams(filter)
    const res = await axiosInstance.get(`/user?${url}`)
    if (filter.search === '') {
      setListAllUser([])
    } else {
      setListAllUser(res.data.data.records)
    }
  }

  const getInfoTeam = async () => {
    const res = await axiosInstance.get(`/team/get-detail-team/${id}`)
    setTitle(`${res.data.data.name}`)
  }
  const getPosition = (gender: number): string => {
    switch (gender) {
      case 1:
        return 'Project manager'
      case 2:
        return 'Developer'
      case 3:
        return 'Tester'
      case 4:
        return 'Comtor'
      default:
        return 'Khác'
    }
  }
  const handleSearch = (data: string) => {
    setFilter({ search: data })
    if (data === '') {
    } else {
      getAllUser()
    }
  }

  const onRemove = async (data: any) => {
    if (teamId) {
      try {
        const res = await removeMember(data, teamId)
        if (res.data.status) {
          setShowModalDeleteMem(false)
          await getListMember()
          setTimeout(() => {
            notification['success']({
              message: 'Delete success',
              description: 'Xóa thành công!',
            })
          }, 250)
        } else {
          setTimeout(() => {
            notification['success']({
              message: 'Delete failed',
              description: 'Xóa Thất bại!',
            })
          }, 250)
        }
      } catch (err: any) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .map((message) => `- ${message}<br>`)
            .join('')
          const key = 'updatable'
          notification['error']({
            key,
            duration: 5,
            message: 'Delete project failed',
            description: (
              <div
                dangerouslySetInnerHTML={{ __html: errorMessages }}
                className="text-red-500"
              />
            ),
          })
        } else {
          notification['error']({
            duration: 5,
            message: 'Delete project failed',
            description: err.response.data.message,
          })
        }
      }
    }
  }

  const lists: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => navigate(`/profile/${data.id}`)}>{data.name}</a>
        </Space>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Vị trí',
      key: 'position_id',
      dataIndex: 'position_id',
      render: (_, data) => getPosition(data?.position_id),
    },
    {
      title: 'Ngày sinh',
      key: 'dob',
      dataIndex: 'dob',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'leader',
      align: 'center',
      width: '12%',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      width: '10%',
      render: (gender: number) => {
        if (gender === 1) {
          return <span>Nam</span>
        } else if (gender === 2) {
          return <span>Nữ</span>
        } else {
          return <span>Khác</span>
        }
      },
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      width: '12%',
    },
    {
      title: 'Hoạt động',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (_, data) => (
        <Space size="middle">
          {permissionsInfo &&
            TEAM_DELETE_MEMBER.every((element: string) =>
              permissionsInfo.includes(element),
            ) && (
              <Button
                danger
                type="primary"
                onClick={() =>
                  deleteUser({
                    user_id: parseInt(data?.id),
                    position_id: parseInt(data?.position_id),
                  })
                }
              >
                <DeleteOutlined />
              </Button>
            )}
        </Space>
      ),
    },
  ]

  const getAllUserVer2 = async () => {
    const res = await axiosInstance.get(`/get-all`)
    setListAllUser(res.data.data)
  }

  const deleteUser = (data: any) => {
    setShowModalDeleteMem(true)
    setNewMem(data)
  }

  const AddUser = async () => {
    const data = { formData }

    try {
      if (teamId) {
        const res = await addMember(data.formData, teamId)
        if (res.data.status) {
          setShowModalAddMem(false)
          await getListMember()
          setTimeout(() => {
            notification['success']({
              message: 'Add success',
              description: 'Thêm thành công!',
            })
          }, 50)
        }
      }
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Add failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          message: 'Add failed',
          duration: 5,
          description: err.response.data.message,
        })
      }
    }
  }

  return (
    <>
      <div>
        <div className="... flex items-center justify-center">
          <h1>{title}</h1>
        </div>
        <Button
          onClick={() => {
            navigate('/projects')
          }}
        >
          Quay lại
        </Button>
        {permissionsInfo &&
          TEAM_ADD_MEMBER.every((element: string) =>
            permissionsInfo.includes(element),
          ) && (
            <Button
              type="primary"
              className="bg-green-500 float-right"
              onClick={() => {
                setShowModalAddMem(true)
              }}
            >
              Thêm thành viên
            </Button>
          )}
        {isLoading ? (
          <Spin className="flex justify-center" />
        ) : (
          <Table className="pt-5" columns={lists} dataSource={listUser} />
        )}
      </div>
      {
        <Modal
          open={showModalAddMem}
          destroyOnClose={true}
          onCancel={() => {
            setShowModalAddMem(false)
          }}
          title={'Thêm thành viên'}
          footer={[
            <Button
              type="dashed"
              className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
              htmlType="submit"
              onClick={() => AddUser()}
            >
              Thêm
            </Button>,
            <Button
              type="dashed"
              className="w-[110px] text-white bg-red-500 m-5 items-center rounded-full"
              onClick={() => {
                setShowModalAddMem(false)
              }}
            >
              Hủy
            </Button>,
          ]}
        >
          <Form>
            <Select
              className="mt-5 w-full"
              placeholder="Thêm thành viên"
              onChange={(value: string) => handleChangeValue('user_id', value)}
              options={listAllUser?.map((user: User) => ({
                value: user.id,
                label: user.name,
              }))}
            ></Select>
            <Select
              className="mt-5 w-full"
              placeholder="Chức vụ"
              options={LIST_POSITION_PROJECT}
              onChange={(value) => handleChangeValue('position_id', value)}
            />
          </Form>
        </Modal>
      }
      {showModalDeleteMem && (
        <ModalRemove
          openModalDelete={setShowModalDeleteMem}
          blog={blog}
          onDelete={() => onRemove(newMem)}
        />
      )}
    </>
  )
}

export default ListMemberOfTeam
