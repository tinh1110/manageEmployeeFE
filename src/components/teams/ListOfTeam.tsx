import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Filter from './Filter'
import { Button, Pagination, Progress, Space, Spin, Table, Tag } from 'antd'
import { Team } from './interface'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import { TEAM_ADD } from '../../libs/constants/Permissions'
import { title } from 'process'
import { FireOutlined } from '@ant-design/icons'
import style from 'antd/es/alert/style'
import { truncate } from '../../utils/string'

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
  const statusLabel = (status: number): any => {
    switch (status) {
      case 1:
        return <Tag color="gray">Chưa bắt đầu</Tag>
      case 2:
        return <Tag color="blue">Đang làm</Tag>
      case 3:
        return <Tag color="red">Bị hủy</Tag>
      case 4:
        return <Tag color="orange">Tạm dừng</Tag>
      case 5:
        return <Tag color="green">Hoàn thành</Tag>
      default:
        return <Tag color="default">Khác</Tag>
    }
  }

  const listsMain: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '8%',
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
      width: '22%',
      render: (text) => <p>{truncate(text, 100)}</p>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '8%',
      render: (_, data) => statusLabel(data?.status),
    },
    {
      title: 'Ngày bắt đầu',
      key: 'start_time',
      dataIndex: 'start_time',
      width: '8%',
    },
    {
      title: 'Ngày kết thúc',
      key: 'end_time',
      dataIndex: 'end_time',
      width: '10%',
      render: (text) => {
        const endTime = new Date(text) // Chuyển đổi giá trị `end_time` thành đối tượng Date
        const now = new Date() // Declare `now` here
        // So sánh `end_time` với `now`
        const isExpired = endTime <= now

        // Kiểm tra nếu `end_time` đã hết hạn
        if (isExpired) {
          return (
            <span style={{ color: 'red' }}>
              {text} <FireOutlined />
            </span>
          )
        }

        return text
      },
    },
    {
      title: 'Thành viên',
      key: 'total_member',
      dataIndex: 'total_member',
      width: '6%',
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
      width: '10%',
    },
    {
      title: 'Tiến độ',
      key: 'percent',
      dataIndex: 'percent',
      width: '6%',
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
      width: '10%',
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
      width: '12%',
      render: (_, data) => (
        <Space size="middle">
          {permissionsInfo &&
            permissionsUpdate.every((element: string) =>
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
            permissionsDelete.every((element: string) =>
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
      {permissionsInfo &&
        TEAM_ADD.every((element: string) =>
          permissionsInfo.includes(element),
        ) && (
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
        )}
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <Table
          columns={listsMain}
          dataSource={listTeam}
          bordered={true}
          pagination={false}
          scroll={{ x: 1500, y: 500 }}
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
