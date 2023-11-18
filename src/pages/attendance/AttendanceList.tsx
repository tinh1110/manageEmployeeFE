import { DownloadOutlined } from '@ant-design/icons'
import {
  Form,
  Select,
  Button,
  Spin,
  DatePicker,
  Segmented,
  Pagination,
  notification,
} from 'antd'
import AttendanceTableManager from '../../components/attendance/AttendanceTableManager'
import { Attendance } from '../../types/attendance'
import { useEffect, useState } from 'react'
import { UserSelect } from '../../components/ui/UserSelect'
import { PERIOD } from '../../libs/constants/Attendance'
import { useSearchParams } from 'react-router-dom'

import { LIST_ATTENDANCE_STATUS } from '../../libs/constants/Options'
import {
  allUser,
  attendanceList,
  attendanceType,
} from '../../services/request/attemdanceList'
import {
  exportAllAttendanceAPI,
  exportAttendanceAPI,
} from '../../services/request/attendance'
import { type } from '@testing-library/user-event/dist/type'
import { number } from 'yup'

const { RangePicker } = DatePicker

export const AttendanceList = () => {
  const [form] = Form.useForm()
  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [users, setUsers] = useState<any>([])
  const [types, setTypes] = useState<any>([])
  const [total, setTotal] = useState<any>(0)
  const [searchParams, setSearchParams] = useState<any>({
    time: PERIOD.TODAY,
    type_id: null,
    ids: [],
    status: null,
    start: null,
    end: null,
  })
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [period, setPeriod] = useState<string>(PERIOD.TODAY)

  const getAttendancePaginate = async (params: any) => {
    setLoading(true)
    try {
      const response = await attendanceList(params)
      setLoading(false)
      setAttendance(response.data.data.records)
      setTotal(response.data.data.total)
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Get attendace failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          message: 'Get Attendance failed',
          duration: 5,
          description: err.response.data.message,
        })
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    getAttendancePaginate(searchParams)
  }, [searchParams])

  const paginationChangeHandler = (pageNumber: number, sizeNumber: number) => {
    const params = new URLSearchParams()
    if (pageNumber) {
      params.set('page', pageNumber.toString())
      setCurrentPage(pageNumber)
    }
    if (sizeNumber) {
      setPageLimit(sizeNumber)
      params.set('limit', sizeNumber.toString())
    }
    setSearchParams(params)
  }

  const segmentValue = [
    {
      label: 'Hôm nay',
      value: PERIOD.TODAY,
    },
    {
      label: 'Tuần này',
      value: PERIOD.THIS_WEEK,
    },
    {
      label: 'Tháng này',
      value: PERIOD.THIS_MONTH,
    },
    {
      label: 'Tất cả',
      value: PERIOD.ALL,
    },
  ]

  const segmentChange = (value: any) => {
    setPeriod(value)
    setSearchParams((prevUser: any) => ({
      ...prevUser,
      time: value,
    }))
  }

  useEffect(() => {
    getAllUsers()
    getType()
  }, [])
  const getAllUsers = async () => {
    const res = await allUser()
    setUsers(res.data.data)
  }
  const getType = async () => {
    const res = await attendanceType()
    setTypes(res.data.data)
  }

  const submitFormHandler = (value: any) => {
    const ids: number[] = []
    value.create_by_id.forEach((id: number) => {
      ids.push(id)
    })
    let start: any = null
    let end: any = null
    if (value.start_time !== null && value.start_time !== undefined) {
      start = value.start_time[0].format('YYYY-MM-DD')
      end = value.start_time[1].format('YYYY-MM-DD')
    }
    setSearchParams((prevUser: any) => ({
      ...prevUser,
      start: start,
      end: end,
      status: value.status,
      type_id: value.type,
      ids: ids,
    }))

    // const params = []

    // if (value.start_time !== null && value.start_time !== undefined) {
    //   params.append('start', value.start_time.format('YYYY-MM-DD'))
    // } else {
    //   params.delete('start')
    // }

    // if (
    //   value.status !== null &&
    //   value.status !== undefined &&
    //   value.status !== ''
    // ) {
    //   params.append('status', value.status)
    // } else {
    //   params.delete('status')
    // }
    // if (value.type !== null && value.type !== undefined && value.type !== '') {
    //   params.append('type_id', value.type)
    // } else {
    //   params.delete('type_id')
    // }

    // if (
    //   value.create_by_id !== null &&
    //   value.create_by_id !== undefined &&
    //   value.create_by_id !== ''
    // ) {
    //   params.delete('ids[]')
    //   value.create_by_id.forEach((id: string) => {
    //     params.append('ids[]', id)
    //   })
    // } else {
    //   params.delete('ids[]')
    // }
    // params.append('time', period)

    // setSearchParams((curr) => ({
    //   ...curr,
    //   params,
    // }))
  }
  const handleTotal = (total: number, range: [number, number]): JSX.Element => {
    return (
      <div className="flex h-full items-center">
        <p>{range[0].toLocaleString()}</p>
        <p>-</p>
        <p>{range[1].toLocaleString()}</p>
        <p>/</p>
        <p>{total}</p>
      </div>
    )
  }
  const exportAttendanceHandler = async () => {
    return await exportAllAttendanceAPI(searchParams)
  }

  return (
    <>
      <div className="flex">
        <Form.Item name="period" initialValue={period}>
          <Segmented
            options={segmentValue}
            onChange={(value) => segmentChange(value)}
          />
        </Form.Item>
      </div>
      <Form form={form} onFinish={submitFormHandler}>
        <div className="flex justify-start">
          <Form.Item>
            {/* <Select placeholder="Trạng thái" className="w-full" options={} /> */}
          </Form.Item>
          <UserSelect
            placeHolder="Tên nhân viên"
            name="create_by_id"
            className="w-52"
            users={users}
            maxTagCount={1}
            maxTagTextLength={8}
          />

          <Form.Item className="w-52 ml-5" name="type">
            <Select
              placeholder="Loại nghỉ"
              allowClear
              options={types.map((option: any) => ({
                value: option.id,
                label: option.name,
              }))}
              className="w-full"
            />
          </Form.Item>
          <Form.Item className="ml-5 " name="start_time">
            <RangePicker className="w-70" />
          </Form.Item>

          <Form.Item className="w-52 ml-5" name="status">
            <Select
              placeholder="Trạng thái"
              className="w-full"
              options={LIST_ATTENDANCE_STATUS}
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="ml-10"
              type="primary"
              onClick={() => form.submit()}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="flex mb-2">
        <Button className="" onClick={exportAttendanceHandler}>
          Export
          <DownloadOutlined />
        </Button>
        <Pagination
          className="ml-auto"
          showSizeChanger
          onChange={paginationChangeHandler}
          current={currentPage}
          total={total}
          pageSize={pageLimit}
          showTotal={handleTotal}
        />
      </div>
      {loading ? (
        <Spin className="flex justify-center" />
      ) : (
        <AttendanceTableManager
          data={attendance}
          setSelectedNumber={setSelectedNumber}
        />
      )}
    </>
  )
}
