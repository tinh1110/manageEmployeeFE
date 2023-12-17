import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Filter from './Filter'
import { Button, Pagination, Progress, Space, Spin, Table } from 'antd'
import { Team } from './interface'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import { getPermissions } from '../../libs/helpers/getLocalStorage'

interface Props {
  listTeam: Team[]
  filter: {
    details: string
    name: string
    sort: string
    sortType: string
    page: string
    limit: string
  }
  permissionsUpdate: Array<string>
  permissionsDelete: Array<string>
  setFilter: React.Dispatch<
    React.SetStateAction<{
      details: string
      name: string
      sort: string
      sortType: string
      page: string
      limit: string
    }>
  >
  resetTable: () => void
  deleteTeam: (id: number) => void
  updateTeam: (id: number) => Promise<void>
  handleListSubOrListMem: (url: string) => Promise<void>
  blog: string
  total: number
  onChange: (page: number, pageSize: number) => void
  teamSubId?: number
  isSubteam: boolean
  isLoading: boolean
}
const ListOfTeam: React.FC<Props> = ({
  listTeam,
  filter,
  setFilter,
  resetTable,
  deleteTeam,
  updateTeam,
  handleListSubOrListMem,
  blog,
  total,
  onChange,
  teamSubId,
  permissionsUpdate,
  permissionsDelete,
  isSubteam,
  isLoading,
}) => {
  const permissionsInfo = getPermissions()
  const navigate = useNavigate()
  const teamId = teamSubId
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const statusLabel = (status: number): string => {
    switch (status) {
      case 1:
        return 'Chưa bắt đầu'
      case 2:
        return 'Đang làm'

      case 3:
        return 'Bị hủy'
      case 4:
        return 'Tạm dừng'

      case 5:
        return 'Hoàn thành'

      default:
        return 'Khác'
    }
  }

  const listsMain: ColumnsType<any> = [
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
          <a onClick={() => handleListSubOrListMem(`/projects/${data.id}`)}>
            {data.name}
          </a>
        </Space>
      ),
    },
    {
      title: 'Mô tả',
      key: 'details',
      dataIndex: 'details',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (_, data) => statusLabel(data?.status),
    },
    {
      title: 'Thời gian bắt đầu',
      key: 'start_time',
      dataIndex: 'start_time',
    },
    {
      title: 'Thời gian kết thúc',
      key: 'end_time',
      dataIndex: 'end_time',
    },
    {
      title: 'Thành viên',
      key: 'total_member',
      dataIndex: 'total_member',
      render: (_, data) => (
        <Space size="middle">
          <a
            onClick={() =>
              handleListSubOrListMem(`/projects/member-of-team/${data.id}`)
            }
          >
            {data.total_member}
          </a>
        </Space>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      dataIndex: 'customer',
      align: 'center',
    },
    {
      title: 'Tiến độ',
      key: 'percent',
      dataIndex: 'percent',
      width: '8%',
      render: (_, data) => (
        <Space size="small">
          <Progress type="circle" percent={data?.percent} size={50} />
        </Space>
      ),
    },
    {
      title: 'Leader',
      dataIndex: 'leader',
      key: 'leader',
      render: (_, data) => (
        <Space size="middle">
          <strong> {data.leader?.name}</strong>
        </Space>
      ),
    },
    {
      title: 'Hoạt động',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (_, data) => (
        <Space size="middle">
          {permissionsInfo &&
            permissionsDelete.every((element: string) =>
              permissionsInfo.includes(element),
            ) && (
              // <Button type="primary" onClick={() => updateTeam(data.id)}>
              //   <EditOutlined />
              // </Button>
              <Link to={`/projects/update/${data.id}}`}>
                <Button
                  type="primary"
                  className=" text-white  bg-sky-500 m-1 rounded-full"
                  htmlType="submit"
                >
                  <EditOutlined />
                </Button>
              </Link>
            )}
          {permissionsInfo &&
            permissionsUpdate.every((element: string) =>
              permissionsInfo.includes(element),
            ) && (
              <Button danger type="primary" onClick={() => deleteTeam(data.id)}>
                <DeleteOutlined />
              </Button>
            )}
        </Space>
      ),
    },
  ]

  return (
    <>
      <Filter
        valueFilter={filter}
        setFilter={setFilter}
        blog={blog}
        handleReset={resetTable}
      />

      <Button
        type="primary"
        className="mb-5 bg-green-500 float-right"
        onClick={() => {
          navigate('/projects/create', { state: { teamId } })
        }}
        style={{ marginBottom: 10 }}
      >
        Thêm dự án mới
      </Button>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <Table
          columns={listsMain}
          dataSource={listTeam}
          bordered={true}
          pagination={false}
          rowKey="id"
        />
      )}

      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={total}
        showSizeChanger={true}
        onChange={onChange}
        className="float-right mt-10"
      />
    </>
  )
}

export default ListOfTeam
