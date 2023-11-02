import { Button, DatePicker, List, Select, notification } from 'antd'
import Search from 'antd/es/input/Search'
import {
  IssuesCloseOutlined,
  DownloadOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { LIST_SORT } from '../../../libs/constants/Options'
import { useEffect, useState } from 'react'
import {
  ImportUserType,
  TypeParamsImport,
  getAdmin,
  importView,
} from '../../../services/importUser'
import { truncate } from '../../../utils/string'
import Pusher from 'pusher-js'
import channel from 'pusher-js/types/src/core/channels/channel'
interface Props {
  isLoadPage: boolean
  setIsLoadPage: (isLoadPage: boolean) => void
}
const ImportSearch: React.FC<Props> = ({ isLoadPage, setIsLoadPage }) => {
  const { RangePicker } = DatePicker
  const [status, setStatus] = useState<string>('')
  const [data, setData] = useState<ImportUserType[]>()
  const [total, setTotal] = useState<number>()
  const [importedUsers, setImportedUsers] = useState<any>()
  const [params, setParams] = useState<TypeParamsImport>({
    page: 1,
    limit: 5,
    sort: 'created_at',
  })
  useEffect(() => {
    // Initialize Pusher with your app key and options
    const pusher = new Pusher('718f9af2e483f5b858af', {
      cluster: 'ap1',
      // Add any additional options or configurations here
    })
    // Subscribe to the desired Pusher channel
    const channel = pusher.subscribe('imported_users')
    // Bind to the event you want to listen to
    channel.bind('imported_users', (data: any) => {
      setImportedUsers(data.imported_users)
      // Handle the received event data
      console.log('Received event:', data.imported_users)
      console.log('123', importedUsers)
      // Perform any other desired actions with the event data
    })

    // Clean up the Pusher subscription when the component unmounts
    // return () => {
    //   // channel.unbind('imported_users')
    //   // pusher.unsubscribe('private-imported_users')
    // }
  }, [])
  useEffect(() => {
    handleGetImported()
    setIsLoadPage(false)
  }, [params, isLoadPage, importedUsers])

  const handleGetImported = async () => {
    try {
      const response = await importView(params)
      setData(response.data.data.records)
      setTotal(response.data.data.total)
    } catch (err: any) {
      notification['error']({
        duration: 5,
        message: 'Get failed',
        description: err.message,
      })
    }
  }

  const handleButtonClick = (newStatus: string) => {
    setStatus(newStatus)

    setParams((params) => ({ ...params, status: newStatus, page: 1 }))
  }
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([])
  useEffect(() => {
    handleGetTypeEvent()
  }, [])
  const handleGetTypeEvent = async () => {
    try {
      const response = await getAdmin()

      const options = response.data.data.records.map((item: any) => ({
        value: item.id,
        label: item.email,
      }))
      setOptions(options)
    } catch (err: any) {
      notification['error']({
        duration: 5,
        message: 'get list admin failed',
        description: err.message,
      })
    }
  }
  const onSearch = (search: string) => {
    setParams((params) => ({ ...params, file_name: search, page: 1 }))
  }
  const onSelect = (type: number) => {
    setParams((params) => ({ ...params, sortType: type, page: 1 }))
  }
  const onSelectAdmin = (id: number) => {
    setParams((params) => ({ ...params, created_by_id: id, page: 1 }))
  }
  const handleDate = (date: any) => {
    if (date)
      setParams((params) => ({
        ...params,
        start_time: dayjs(date[0]).format('YYYY-MM-DD'),
        end_time: dayjs(date[1]).format('YYYY-MM-DD'),
        page: 1,
      }))
    else {
      setParams((params) => ({
        ...params,
        start_time: '',
        end_time: '',
        page: 1,
      }))
    }
  }
  const handleColorStatus = (status: string) => {
    if (status === '0') return 'text-yellow-500'
    else if (status === '1') return 'text-green-500'
    return 'text-red-500'
  }
  return (
    <>
      <div className="flex mt-10">
        <Search
          placeholder="input search text"
          className="w-[30%]"
          onSearch={onSearch}
          enterButton
        />
        <span className="ml-5 mr-5 font-bold">Thời gian Import</span>
        <RangePicker
          className="w-[35%]"
          onChange={handleDate}
          presets={[
            {
              label: (
                <span aria-label="Current Time to End of Day">Now ~ EOD</span>
              ),
              value: () => [dayjs(), dayjs().endOf('day')],
            },
          ]}
          showTime
          format="YYYY-mm-dd"
        />
        <Select
          options={LIST_SORT}
          onChange={onSelect}
          defaultValue={0}
          className="ml-auto  mr-10"
        />
      </div>
      <div className="flex mt-10">
        <div className="w-[30%]">
          <IssuesCloseOutlined />
          <span className="ml-1">Trạng thái:</span>

          <Button
            name="status"
            className={`ml-2 ${
              status === '' ? 'bg-sky-400' : ''
            } text-xs rounded-2xl `}
            onClick={() => handleButtonClick('')}
            value="all"
          >
            Tất cả
          </Button>
          <Button
            name="status"
            className={`ml-2 ${
              status === '0' ? 'bg-sky-400' : ''
            } text-xs rounded-2xl `}
            onClick={() => handleButtonClick('0')}
            value="0"
          >
            Đang import
          </Button>
          <Button
            name="status"
            className={`ml-2 ${
              status === '1' ? 'bg-sky-400' : ''
            } text-xs rounded-2xl `}
            onClick={() => handleButtonClick('1')}
            value="1"
          >
            Import xong
          </Button>
        </div>
        <div className="w-[50%] ml-[10%]">
          <span className="ml-5 mr-5 font-bold"> Người thực hiện:</span>
          {options && (
            <Select
              options={options}
              onChange={onSelectAdmin}
              placeholder="Admin"
              className="w-[70%] "
            />
          )}
        </div>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          current: params.page,
          onChange: (page: number) => {
            setParams((params) => ({ ...params, page: page }))
          },
          pageSize: 5,
          total: total,
        }}
        dataSource={data}
        renderItem={(item) => {
          return (
            <List.Item>
              <div className="flex ">
                <div className=" w-full h-[40px] mt-10 flex">
                  <div className="w-[3%] flex">
                    <DownloadOutlined className="text-[25px] " />
                  </div>
                  <div className="w-[25%]">
                    <div className="h-1/2">
                      <a href={item?.link} download>
                        {truncate(item?.file_name, 50)}
                      </a>
                    </div>
                    <div className="h-1/2">
                      <>
                        <CalendarOutlined />
                        <span>Ngày nhập: {item?.created_at}</span>
                      </>
                    </div>
                  </div>
                  <div className="w-[10%]">
                    <span>{item?.error}</span>
                  </div>
                  <div className="w-[25%]">
                    <span>
                      Người thực hiện:
                      <span className="font-bold">
                        {item?.created_by?.email}
                      </span>
                    </span>
                  </div>
                  <div className={`w-[25%] `}>
                    <span
                      className={`font-bold  ${handleColorStatus(
                        item?.status.toString(),
                      )}`}
                    >
                      {item?.result}
                    </span>
                    <br />
                    {item?.success_amount > 0 && (
                      <>
                        <span className="font-bold text-green-500">
                          Có {item?.success_amount} bản ghi thành công
                        </span>
                        <br />
                      </>
                    )}
                    {item?.fail_amount > 0 && (
                      <>
                        <span className="font-bold text-red-500">
                          Có {item?.fail_amount} bản ghi thất bại
                        </span>
                        <br />
                      </>
                    )}
                  </div>
                  {item?.status === 2 && (
                    <div className="w-[10%]">
                      <a href={item?.link} download>
                        Xem chi tiết lỗi
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </List.Item>
          )
        }}
      />
    </>
  )
}

export default ImportSearch
