import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Space, Button, Modal, Table, message, Spin } from 'antd'
import ModalRemove from './ModalRemove'
import axiosInstance from '../../services/request/base'
import SelectOption from '../../components/teams/SelectOption'
import { User } from '../../components/teams/interface'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../../components/layouts/main'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import { TEAM_DELETE_MEMBER } from '../../libs/constants/Permissions'
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
  const [newMem, setNewMem] = useState<number>(1)
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

  const getListMember = async () => {
    const res = await axiosInstance.get(`/team/get-list-user-of-team/${teamId}`)
    setListUser(res.data.data.records)
    setIsLoading(false)
  }

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

  const handleSearch = (data: string) => {
    setFilter({ search: data })
    if (data === '') {
    } else {
      getAllUser()
    }
  }

  const onRemove = async (id: number) => {
    const res = await axiosInstance.delete(
      `/team/remove-member/${teamId}?ids[]=${id}`,
    )
    if (res.data.status) {
      setShowModalDeleteMem(false)
      await getListMember()
      setTimeout(() => {
        message.success('Delete Successful')
      }, 250)
    } else {
      setTimeout(() => {
        message.error('Delete Fail')
      }, 250)
    }
  }

  const lists: ColumnsType<User> = [
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
              <Button danger type="primary" onClick={() => deleteUser(data.id)}>
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

  const deleteUser = (id: number) => {
    setShowModalDeleteMem(true)
    setNewMem(id)
  }

  const AddUser = async () => {
    const data = {
      ids: chooseUserToAt,
    }

    try {
      const res = await axiosInstance.post(`/team/add-member/${teamId}`, data)
      if (res.data.status) {
        setShowModalAddMem(false)
        await getListMember()
        setTimeout(() => {
          message.success('Add member successful')
        }, 50)
      }
    } catch (error) {
      setTimeout(() => {
        message.error('The user is already in the team')
      }, 50)
    }
  }

  const handleChange = (value: number[]) => {
    setChooseUserToAt(value)
  }

  return (
    <>
      <div>
        <div className="... flex items-center justify-center">
          <h1>{title}</h1>
        </div>
        <Button
          onClick={() => {
            navigate(-1)
          }}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          className="bg-orange-500 float-right"
          onClick={() => {
            setShowModalAddMem(true)
          }}
        >
          Thêm thành viên
        </Button>

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
          <>
            <SelectOption
              blog="Please choose user"
              handleChange={handleChange}
              handleSearch={handleSearch}
              data={listAllUser}
              mode="multiple"
            />
          </>
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
