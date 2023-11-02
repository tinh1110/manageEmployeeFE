import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Space, Modal, Button, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import MainLayout from '../../components/layouts/main'
import Filter from '../../components/user/filter'
import { User } from '../../types/user'
import { FilterType } from '../../types/user'
import {
  deletedUserApi,
  userApiForceDelete,
  userApiRestore,
} from '../../services/request/user'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import {
  USER_FORCE_DELETE,
  USER_RESTORE,
} from '../../libs/constants/Permissions'
import { getRole } from '../../services/request/user'

const DeletedUsers = () => {
  const permissionsInfo = getPermissions()
  const [idUser, setIdUser] = useState()
  const [totalUser, setTotalUser] = useState()
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()

  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState<FilterType>({
    gender: '',
    status: '',
    role: '',
    limit: '10',
    page: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>()
  const handleDelete = async (key: string) => {
    await userApiForceDelete({ setIdUser, setIsLoading }, key)
  }
  const handleRestore = async (key: string) => {
    await userApiRestore({ setIdUser, setIsLoading }, key)
  }

  const showDeleteConfirm = (record: any) => {
    Modal.confirm({
      title: 'Delete Record',
      content: `Are you sure you want to delete ${record.name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(record.id)
      },
    })
  }
  const showRestoreConfirm = (record: any) => {
    Modal.confirm({
      title: 'Store Record',
      content: `Are you sure you want to store ${record.name}?`,
      okText: 'Yes',
      okType: 'dashed',
      cancelText: 'No',
      onOk() {
        handleRestore(record.id)
      },
    })
  }
  useEffect(() => {
    setIsLoading(true)
    const url = new URLSearchParams(filter)
    deletedUserApi(url, { setUsers, setTotalUser, setIsLoading })
    getRoles()
  }, [])
  useEffect(() => {
    const url = new URLSearchParams(filter)
    deletedUserApi(url, { setUsers, setTotalUser, setIsLoading })
  }, [filter, idUser])

  const getRoles = async () => {
    const response = await getRole()
    setRoles(response)
  }
  const columns: ColumnsType<User> = [
    {
      key: 'name',
      title: 'Tên',
      dataIndex: 'name',
      align: 'center',
      width: '15%',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '15%',
    },
    {
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
      align: 'center',
      width: '15%',
    },
    {
      key: 'phone_number',
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      align: 'center',
      width: '10%',
    },
    {
      key: 'dob',
      title: 'Ngày sinh',
      dataIndex: 'dob',
      align: 'center',
      width: '10%',
      render: (dob: string) => {
        let awesomeDate: String = ''
        if (dob) {
          const [year, month, day]: string[] = dob.split('-')
          awesomeDate = `${day}/${month}/${year}`
        }
        return <p>{awesomeDate}</p>
      },
    },
    {
      key: 'gender',
      title: 'Giới tính',
      dataIndex: 'gender',
      align: 'center',
      width: '5%',
      render: (gender) => {
        if (gender == 1) {
          return <p>Nam</p>
        } else if (gender == 2) {
          return <p>Nữ</p>
        } else return <p>Khác</p>
      },
    },
    {
      key: 'role',
      title: 'Chức vụ',
      dataIndex: 'role_id',
      align: 'center',
      width: '5%',
      render: (role) => {
        const matchedRole: any = roles.find(
          (each_role: any) => each_role?.id === role,
        )
        if (matchedRole) {
          return <p>{matchedRole.role_name}</p>
        }
        return null
      },
    },
    {
      key: 'id',
      title: 'Hoạt động',
      dataIndex: 'id',
      align: 'center',
      width: '15%',

      render: (text, record) => (
        <Space size="middle">
          {permissionsInfo &&
            USER_RESTORE.every((element: string) =>
              permissionsInfo.includes(element),
            ) && (
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                to=""
                onClick={() => showRestoreConfirm(record)}
              >
                <UndoOutlined />
              </Link>
            )}
          {permissionsInfo &&
            USER_FORCE_DELETE.every((element: string) =>
              permissionsInfo.includes(element),
            ) && (
              <Link
                className='class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"'
                to=""
                onClick={() => showDeleteConfirm(record)}
              >
                <DeleteOutlined />
              </Link>
            )}
        </Space>
      ),
    },
  ]

  return (
    <MainLayout>
      <>
        <div className="mb-12">
          <h2>Danh sách nhân viên đã xóa</h2>
        </div>
        <Filter setFilter={setFilter} filterValue={filter} />
        <Button
          type="primary"
          className="mb-5 mt-5 bg-sky-500 float-right"
          onClick={() => {
            navigate('/users')
          }}
        >
          Danh sách nhân viên
        </Button>
        {isLoading ? (
          <Spin className="flex justify-center" />
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            bordered
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              total: totalUser,
              onChange: (page, pageSize) => {
                setFilter((filter: any) => ({
                  ...filter,
                  page: page.toString(),
                  limit: pageSize.toString(),
                }))
              },
            }}
          />
        )}
      </>
    </MainLayout>
  )
}

export default DeletedUsers
