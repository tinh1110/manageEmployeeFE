import React, { useEffect, useMemo, useState } from 'react'
import {
  Avatar,
  Button,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import {
  getDetailProject,
  getListUserOfTeam,
} from '../../services/request/team'
import { ISSUES, STATUS_PROJECT } from './constants'
import { ColumnsType } from 'antd/es/table'
import { TagPriority, TagPriority2, TagStatus } from './components'
import axiosInstance from '../../services/request/base'
import useravt from '../../assets/user.png'
import { FireOutlined } from '@ant-design/icons'
import style from 'antd/es/alert/style'

const ListSub = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState<string>('')
  const [isloading, setIsloading] = useState<boolean>(false)
  const [filter, setFilter] = useState({
    type_issue: 1,
    status: 6,
    assignee_id: 0,
    subject: '',
  })
  useEffect(() => {
    getInfoTeam()
  }, [])
  const columns: ColumnsType<any> = [
    {
      title: 'Loại',
      dataIndex: 'parent_id',
      key: 'parent_id',
      render: (row) => {
        if (!row) return <Tag color="green">Task lớn</Tag>
        return <Tag color="red">Task nhỏ</Tag>
      },
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'subject',
      key: 'subject',
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => navigate(`/projects/issues/${data.id}`)}>
            {data.subject}
          </a>
        </Space>
      ),
    },
    {
      title: 'Người nhận',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (row) => {
        return (
          <div>
            <Avatar src={row?.avatar || useravt} />
            <span className="ml-2">{row.name}</span>
          </div>
        )
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (row) => {
        return TagStatus(row)
      },
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (row) => {
        return TagPriority2(row)
      },
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
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
      title: 'Người tạo',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (row) => {
        return (
          <div>
            <Avatar src={row.avatar || useravt} />
            <span className="ml-2">{row.name}</span>
          </div>
        )
      },
    },
  ]
  const getInfoTeam = async () => {
    setIsloading(true) // Bắt đầu loading
    const res = await axiosInstance.get(`/team/get-detail-team/${id}`)
    setIsloading(false) // Kết thúc loading
    setTitle(`${res.data.data.name}`)
  }
  const handleChangeFilter = (value: string | number, name: string) => {
    setFilter({
      ...filter,
      [name]: value,
    })
  }
  const { data: dataListOfTeam } = useSWR(
    id ? ['get-list-user-of-team', id] : null,
    async () => {
      const result = await getListUserOfTeam(id ?? '')
      return result
    },
    {
      refreshInterval: 0,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
    },
  )
  const assignList =
    dataListOfTeam?.data.data.records.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) ?? []

  const { data, isLoading } = useSWR(
    id
      ? [
          'get-detail-team',
          filter.status,
          filter.subject,
          filter.type_issue,
          filter.assignee_id,
        ]
      : null,
    async () => {
      setIsloading(true) // Bắt đầu loading
      const result = await getDetailProject(filter, id ?? '')
      setIsloading(false) // Kết thúc loading
      return result
    },
    {
      refreshInterval: 0,
      revalidateIfStale: true,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
    },
  )
  const dataSource = data?.data.data
  return (
    <>
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
      <Button
        type="primary"
        className="mr-5 bg-green-500 float-right"
        onClick={() => {
          navigate(`/projects/${id}/add/issues`)
        }}
      >
        Thêm issue mới
      </Button>
      <div className="flex gap-5">
        <div>
          <p className="my-2">Loại</p>
          <Select
            value={filter.type_issue}
            options={ISSUES}
            style={{ width: 120 }}
            onChange={(e) => {
              handleChangeFilter(e, 'type_issue')
            }}
          />
        </div>
        <div>
          <p className="my-2">Trạng thái</p>
          <Select
            value={filter.status}
            options={STATUS_PROJECT}
            style={{ width: 150 }}
            onChange={(e) => {
              handleChangeFilter(e, 'status')
            }}
          />
        </div>
        <div>
          <p className="my-2">Người nhận</p>
          <Select
            defaultValue={0}
            value={filter.assignee_id}
            options={[
              {
                value: 0,
                label: 'Tất cả',
              },
              ...assignList,
            ]}
            onChange={(e) => {
              handleChangeFilter(e, 'assignee_id')
            }}
            style={{ width: 150 }}
          />
        </div>
        <div>
          <p className="my-2">Tiêu đề</p>
          <Input
            placeholder="Keyword"
            value={filter.subject}
            onChange={(e) => {
              handleChangeFilter(e.target.value, 'subject')
            }}
          />
        </div>
      </div>
      <>
        {isloading ? (
          <Spin className="mt-3 flex justify-center" />
        ) : (
          <Table className="mt-3" columns={columns} dataSource={dataSource} />
        )}
      </>
    </>
  )
}

export default ListSub
