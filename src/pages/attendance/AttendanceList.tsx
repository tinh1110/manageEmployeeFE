import MainLayout from '../../components/layouts/main'
import { DownloadOutlined } from '@ant-design/icons'
import {
  Switch,
  Form,
  Select,
  Button,
  notification,
  Spin,
  DatePicker,
  Segmented,
  Space,
  Input,
  Pagination,
  Table,
} from 'antd'
import AttendanceTableManager from '../../components/attendance/AttendanceTableManager'
import { Attendance } from '../../types/attendance'
import { useEffect, useState } from 'react'
import { UserSelect } from '../../components/ui/UserSelect'
// import { getAllUserAPI } from '../../services/request/user'
import { User } from '../../types/user'
import { PERIOD } from '../../libs/constants/Attendance'
// import { attendanceListPaginateAPI } from '../../services/request/attendance'
import { useSearchParams } from 'react-router-dom'
import attendance from '.'
import Spinner from '../../components/user/spin'
import { LIST_BO_CONFIRM, LIST_STATUS } from '../../libs/constants/Options'

const { RangePicker } = DatePicker

export const AttendanceList = () => {
  const [form] = Form.useForm()
  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [users, setUsers] = useState<any>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [totalRecords, setTotalRecords] = useState<number>()
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [period, setPeriod] = useState<number>(PERIOD.THIS_WEEK)

  const getAttendancePaginate = async (searchParams: URLSearchParams) => {
    // const res = await attendanceListPaginateAPI(searchParams)
    // setAttendance(res.data.data.records.data)
    // setTotalRecords(res.data.data.total)
    // setCurrentPage(res.data.data.page)
    // setPageLimit(res.data.data.limit)
    // setLoading(false)
  }

  useEffect(() => {
    // setLoading(true)
    // getAttendancePaginate(searchParams)
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams()
    params.append('period', period.toString())
    setSearchParams(params)
  }, [])

  const paginationChangeHandler = (pageNumber: number, sizeNumber: number) => {
    const params = new URLSearchParams()
    if (pageNumber) {
      params.set('page', pageNumber.toString())
      setCurrentPage(pageNumber)
    }
    if (sizeNumber) {
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

  const segmentChange = (value: any) => {}

  const fakeData: Array<Attendance> = [
    {
      id: 1,
      created_by: 'ABC',
      type_name: 'Xin nghỉ',
      start: '2023-11-02',
      end: '2023-11-05',
      total_hours: 10.5,
      status: 0,
      approver: 'BCA',
    },
    {
      id: 2,
      created_by: 'ABC',
      type_name: 'Xin nghỉ',
      start: '2023-11-02',
      end: '2023-11-05',
      total_hours: 10.5,
      status: 0,
      approver: 'BCA',
    },
    {
      id: 3,
      created_by: 'ZZZ',
      type_name: 'Xin nghỉ',
      start: '2023-11-06',
      end: '2023-11-09',
      total_hours: 10.5,
      status: 0,
      approver: 'AAA',
    },
  ]

  useEffect(() => {
    // getAllUsers()
  }, [])

  const getAllUsers = async () => {
    // const res = await getAllUserAPI()
    // setUsers(res.data.data)
  }

  const submitFormHandler = (value: any) => {
    console.log(value)
    const params = new URLSearchParams(searchParams)

    if (value.period !== null && value.period !== period) {
      params.delete('period')
      setPeriod(value.period)
      params.append('period', value.period)
    }

    if (value.created_at !== null && value.created_at !== undefined) {
      params.append('created_at', value.created_at.format('YYYY-MM-DD'))
    } else {
      params.delete('created_at')
    }

    if (value.start_time !== null && value.start_time !== undefined) {
      params.append('start_time', value.start_time.format('YYYY-MM-DD'))
    } else {
      params.delete('start_time')
    }

    if (
      value.status !== null &&
      value.status !== undefined &&
      value.status !== ''
    ) {
      params.append('status', value.status)
    } else {
      params.delete('status')
    }

    if (
      value.bo_confirm !== null &&
      value.bo_confirm !== undefined &&
      value.bo_confirm !== ''
    ) {
      params.append('bo_confirm', value.bo_confirm)
    } else {
      params.delete('bo_confirm')
    }

    if (
      value.create_by_id !== null &&
      value.create_by_id !== undefined &&
      value.create_by_id !== ''
    ) {
      params.delete('created_by_id[]')
      value.create_by_id.forEach((id: string) => {
        params.append('created_by_id[]', id)
      })
    } else {
      params.delete('created_by_id[]')
    }

    setSearchParams(params)
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

  return (
    <MainLayout>
      <Form form={form} onFinish={submitFormHandler}>
        <div className="flex">
          <Form.Item name="period" initialValue={period}>
            <Segmented options={segmentValue} onChange={segmentChange} />
          </Form.Item>
        </div>
        <div className="flex justify-start">
          <Form.Item>
            <Input placeholder="Mã nhân sự" className="w-52"></Input>
          </Form.Item>
          <UserSelect
            placeHolder="Nhân sự đề xuất"
            name="create_by_id"
            className="w-52 ml-3"
            users={users}
            maxTagCount={1}
            maxTagTextLength={8}
          />
          <Form.Item className="w-52 ml-3">
            <Select placeholder="Loại đề xuất" className="w-full" />
          </Form.Item>
          <Form.Item className="w-52 ml-3">
            <Select placeholder="Tiêu đề" className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button
              className="ml-3"
              type="primary"
              onClick={() => form.submit()}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
        <div className="flex">
          <Form.Item name="created_at">
            <RangePicker className="w-52" />
          </Form.Item>
          <Form.Item className="ml-3" name="start_time">
            <RangePicker className="w-52" />
          </Form.Item>
          <Form.Item className="w-52 ml-3" name="status">
            <Select
              placeholder="Trạng thái"
              className="w-full"
              options={LIST_STATUS}
            />
          </Form.Item>
          <Form.Item className="w-52 ml-3" name="bo_confirm">
            <Select
              placeholder="BO confirm"
              className="w-full"
              options={LIST_BO_CONFIRM}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="flex mb-2">
        <Button type="primary">Mới</Button>
        <Button className="ml-2">
          <DownloadOutlined />
        </Button>
        <div className="m-auto">
          {selectedNumber > 0 && (
            <>
              <span className="mr-1">{selectedNumber} Selected</span>
              <Select placeholder="Action"></Select>
            </>
          )}
        </div>
        <Pagination
          className="ml-auto"
          showSizeChanger
          onChange={paginationChangeHandler}
          current={currentPage}
          total={totalRecords}
          pageSize={pageLimit}
          showTotal={handleTotal}
        />
      </div>
      <AttendanceTableManager
        data={fakeData}
        setSelectedNumber={setSelectedNumber}
      />
      {loading && <Spinner />}
    </MainLayout>
  )
}
