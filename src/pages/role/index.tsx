import MainLayout from '../../components/layouts/main'
import { useEffect, useState } from 'react'
import { Button, Modal, Space, Spin, Table, Tag, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ParamsRole, Role } from '../../types/role'
import { deleteRole, role } from '../../services/role'
import { ROLES_ID } from '../../libs/constants/roles'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import { ROLE_DELETE, ROLE_UPDATE } from '../../libs/constants/Permissions'
const RolePage = () => {
  const [roles, setRoles] = useState<Role[]>()
  const [total, setTotal] = useState<number>()
  const [isloading, setIsloading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [params, setParams] = useState<ParamsRole>({
    page: 1,
    sortType: 1,
    limit: 5,
  })
  const permissionsInfo = getPermissions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    handleGetRoles()
  }, [params])
  const handleGetRoles = async () => {
    setIsloading(true)
    try {
      const response = await role(params)
      setRoles(response.data.data.records)
      setTotal(response.data.data.total)
      setIsloading(false)
    } catch (err: any) {
      notification['error']({
        duration: 5,
        message: 'Get Roles failed',
        description: err.message,
      })
    }
  }
  interface DataType {
    key: number
    name: string
    description: string
    permissions: string[]
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên role',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      className: 'w-[5%]',
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      // className: 'w-1/10',
    },
    {
      title: 'Quyền truy cập',
      key: 'permissions',
      dataIndex: 'permissions',
      align: 'center',
      width: '50%',
      render: (_, { permissions }) => (
        <>
          {permissions.map((permission) => {
            return (
              <Tag color="green" key={permission}>
                {permission}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'id',
      key: 'id_d',
      align: 'center',
      width: '15%',
      render: (id) => {
        let cr_id = id
        return (
          <>
            {cr_id !== ROLES_ID.ADMIN_ID &&
              permissionsInfo &&
              ROLE_UPDATE.every((element: string) =>
                permissionsInfo.includes(element),
              ) && (
                <Space size="middle">
                  <Link to={`/role/update/${cr_id}`}>
                    <Button
                      type="primary"
                      className=" text-white  bg-sky-500 m-1 rounded-full"
                      htmlType="submit"
                    >
                      <EditOutlined />
                    </Button>
                  </Link>
                </Space>
              )}
            {cr_id !== ROLES_ID.ADMIN_ID &&
              permissionsInfo &&
              ROLE_DELETE.every((element: string) =>
                permissionsInfo.includes(element),
              ) && (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      showModal()
                      setIdDelete(cr_id)
                    }}
                    className=" text-white bg-red-500 m-1 rounded-full"
                  >
                    <DeleteOutlined />
                  </Button>
                </>
              )}
          </>
        )
      },
    },
  ]
  const [idDelete, setIdDelete] = useState(0)

  const handleDeleteRole = async () => {
    try {
      const response = await deleteRole(idDelete)
      notification['success']({
        duration: 5,
        message: 'Delele successful',
        description: response.data.message,
      })

      handleGetRoles()
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'message'
        notification['error']({
          key,
          duration: 5,
          message: 'Delete role failed',
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
          message: 'Delete role failed',
          description: err.response.data.message,
        })
      }
    }
    setIsModalOpen(false)
  }

  const data: DataType[] =
    roles?.map((role, index) => ({
      key: index,
      id: role.id,
      name: role?.role_name ?? 'N/A',
      description: role?.description ?? 'N/A',
      permissions: role?.role_permissions ?? [],
    })) ?? []

  return (
    <>
      <>
        <Button
          type="primary"
          className="mb-5 bg-green-500 float-right"
          onClick={() => {
            navigate('/role/add')
          }}
        >
          Thêm role mới
        </Button>
        {isloading ? (
          <Spin className="flex justify-center" />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              showSizeChanger: true,
              current: params.page,
              onChange: (page, pageSize) => {
                setParams((params) => ({
                  ...params,
                  page: page,
                  limit: pageSize,
                }))
              },
              pageSize: params.limit,
              total: total,
            }}
          />
        )}
        <Modal
          title="Delete Role"
          open={isModalOpen}
          onOk={() => handleDeleteRole()}
          onCancel={handleCancel}
        >
          <p>"Are you sure to delete this role?"</p>
        </Modal>
      </>
    </>
  )
}

export default RolePage
