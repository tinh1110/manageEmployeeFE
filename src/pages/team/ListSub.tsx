import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Button, Input, Select, Table, Tag, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import {
  getDetailProject,
  getListUserOfTeam,
} from '../../services/request/team'
import { ISSUES, STATUS_PROJECT } from './constants'
import { ColumnsType } from 'antd/es/table'
import { TagPriority, TagStatus } from './components'
const columns: ColumnsType<any> = [
  {
    title: 'Issue Type',
    dataIndex: 'parent_id',
    key: 'parent_id',
    render: (row) => {
      if (!row) return <Tag color="green">Parent</Tag>
      return <Tag color="red">Child</Tag>
    },
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Assignee',
    dataIndex: 'assignee',
    key: 'assignee',
    render: (row) => {
      return (
        <div>
          <Avatar src={row.avatar} />
          <span className="ml-2">{row.name}</span>
        </div>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (row) => {
      return TagStatus(row)
    },
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (row) => {
      return TagPriority(row)
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_date',
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
    render: (row) => {
      return (
        <div>
          <Avatar src={row.avatar} />
          <span className="ml-2">{row.name}</span>
        </div>
      )
    },
  },
]
const ListSub = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [filter, setFilter] = useState({
    type_issue: 1,
    status: 6,
    assignee_id: 0,
    subject: '',
  })
  const handleChangeFilter = (value: string | number, name: string) => {
    setFilter({
      ...filter,
      [name]: value,
    })
  }
  const { data: dataListOfTeam } = useSWR(
    id ? ['get-list-user-of-team', id] : null,
    () => getListUserOfTeam(id ?? ''),
    {
      refreshInterval: 0,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
    },
  )
  const assignList = useMemo(() => {
    return (
      dataListOfTeam?.data.data.records.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) ?? []
    )
  }, [dataListOfTeam])

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
    () => getDetailProject(filter, id ?? ''),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
    },
  )
  const dataSource = useMemo(() => {
    return data?.data.data ?? []
  }, [data])

  return (
    <>
      <Button
        onClick={() => {
          navigate(-1)
        }}
      >
        Quay lại
      </Button>
      <div className="flex gap-5">
        <div>
          <p className="my-2">Issue</p>
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
          <p className="my-2">Status</p>
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
          <p className="my-2">Assign</p>
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
          <p className="my-2">Subject</p>
          <Input
            placeholder="Keyword"
            value={filter.subject}
            onChange={(e) => {
              handleChangeFilter(e.target.value, 'subject')
            }}
          />
          ;
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} loading={isLoading} />
    </>
  )
}

export default ListSub
