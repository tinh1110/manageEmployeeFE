import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Space, Table, Tag, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  CheckOutlined,
  CloseOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { Attendance } from '../../types/attendance'
import { render } from 'react-dom'
import { ATTENDANCE_STATUS } from '../../libs/constants/Attendance'
import {
  approveAttendanceAPI,
  rejectAttendanceAPI,
} from '../../services/request/attendance'

interface Props {
  data: Array<Attendance>
  setSelectedNumber: Dispatch<SetStateAction<number>>
  setLoading: Dispatch<SetStateAction<boolean>>
  getAttendancePaginate: Dispatch<SetStateAction<any>>
  searchParams: Dispatch<SetStateAction<any>>
}

const AttendanceTableManager = ({
  data,
  setSelectedNumber,
  setLoading,
  getAttendancePaginate,
  searchParams,
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedNumber(newSelectedRowKeys.length)
  }

  const columns: ColumnsType<Attendance> = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: (a: any, b: any) => a.id - b.id,
    //   render: (id) => <p className="text-lime-600">{id}</p>,
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
    },
    {
      title: 'Người tạo',
      dataIndex: 'created_by_name',
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'created_role',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'type_name',
      key: 'type_name',
      render: (type_name, record) => (
        <div className="flex justify-between">
          <p>{type_name}</p>
          {record.status === 0 && <UnlockOutlined />}
          {record.status !== 0 && <LockOutlined />}
        </div>
      ),
    },
    {
      title: 'Ngày bắt đầu',
      key: 'start',
      dataIndex: 'start',
    },
    {
      title: 'Ngày kết thúc',
      key: 'end',
      dataIndex: 'end',
    },
    {
      title: 'Tổng giờ',
      key: 'total_hours',
      dataIndex: 'total_hours',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      fixed: 'right',
      render: (status) => (
        <>
          {status === 0 && (
            <Tag color="yellow" className="text-xs">
              Đang chờ
            </Tag>
          )}
          {status === 1 && (
            <Tag color="green" className="text-xs">
              Chấp nhận
            </Tag>
          )}
          {status === 2 && (
            <Tag color="red" className="text-xs">
              Từ chối
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Người duyệt',
      key: 'approver',
      dataIndex: 'approver_name',
      fixed: 'right',
    },
    {
      title: 'Confirm',
      fixed: 'right',
      render: (id) => (
        <>
          <Button
            className="bg-green-700 text-white mr-2"
            icon={<CheckOutlined />}
            size="small"
            onClick={() => reviewAttendanceHandler(id, 1, '')}
          ></Button>
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            size="small"
            onClick={() => reviewAttendanceHandler(id, 2, '')}
          ></Button>
        </>
      ),
    },
  ]

  const reviewAttendanceHandler = async (
    id: any,
    status: number,
    result: any,
  ) => {
    setLoading(true)
    try {
      if (id.status !== 0) {
        notification['error']({
          key: 'error',
          duration: 5,
          message: 'Không thể thay đổi đơn đã duyệt',
        })
      } else {
        if (status === ATTENDANCE_STATUS.ATTENDANCE_ACCEPT) {
          await approveAttendanceAPI(id.id, result)
          notification['success']({
            key: 'accept',
            duration: 5,
            message: 'Chấp nhận thành công',
          })
        } else if (status === ATTENDANCE_STATUS.ATTENDANCE_REJECT) {
          await rejectAttendanceAPI(id.id, result)
          notification['success']({
            key: 'reject',
            duration: 5,
            message: 'Từ chối thành công',
          })
        }
        getAttendancePaginate(searchParams)
      }
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = ''
        notification['error']({
          key,
          duration: 5,
          message: 'Duyệt đơn thất bại',
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
          message: 'Duyệt đơn thất bại',
          description: err.response.data.message,
        })
      }
    }
    setLoading(false)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: Attendance) => ({
      // Use the 'id' property as the key for the selected rows
      name: record.id?.toString(),
    }),
  }

  const tablecolumns =
    1 === 1
      ? columns.filter((col: any) => col.dataIndex !== 'confirm')
      : columns

  return (
    <>
      <Table
        rowKey={'id'}
        columns={tablecolumns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
        scroll={{ x: 'max-content' }}
        rowClassName="text-xs"
      />
    </>
  )
}

export default AttendanceTableManager
