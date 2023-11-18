import MainLayout from '../../components/layouts/main'
import { useEffect, useState } from 'react'
import { Button, Input, List, Select, notification, Spin } from 'antd'
import { deleteEvent, event, getTypeEvent } from '../../services/event'
import { TypeEvent, TypeParamsEvent } from '../../types/event'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import { useNavigate } from 'react-router-dom'
import EventItem from './eventItem'
const { Search } = Input

const EventPage = () => {
  const [res, setRes] = useState<TypeEvent[]>()
  const [total, setTotal] = useState<number>()
  const [idDelete, setIdDelete] = useState(0)
  const [params, setParams] = useState<TypeParamsEvent>({
    page: 1,
    limit: 5,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([])
  useEffect(() => {
    handleGetTypeEvent()
  }, [])
  const handleGetTypeEvent = async () => {
    setIsLoading(true)
    try {
      const response = await getTypeEvent()
      const options = response.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))
      setOptions(options)
      setIsLoading(false)
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Get type event failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          message: 'Get type event failed',
          duration: 5,
          description: err.response.data.message,
        })
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetEvent()
  }, [params])

  const handleGetEvent = async () => {
    setIsLoading(true)
    try {
      const response = await event(params)
      setRes(response.data.data.records)
      setTotal(response.data.data.total)
      setIsLoading(false)
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Get Event failed',
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
          message: 'Get event failed',
          description: err.response.data.message,
        })
      }
      setIsLoading(false)
    }
  }

  const onSearch = (search: string) => {
    setParams((params) => ({ ...params, name: search, page: 1 }))
  }
  const onSelect = (type: string) => {
    setParams((params) => ({ ...params, type: parseInt(type), page: 1 }))
  }
  const handleChangDate = (event: any) => {
    const { value } = event.target
    setParams((params) => ({ ...params, date: value, page: 1 }))
  }

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(idDelete)
      notification['success']({
        duration: 5,
        message: 'Delele successful',
        description: response.data.message,
      })

      handleGetEvent()
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Delete event failed',
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
          message: 'Delete event failed',
          description: err.response.data.message,
        })
      }
    }
    setIsModalOpen(false)
  }
  const permissionsInfo = getPermissions()
  return (
    <>
      <div className="flex">
        <Search
          placeholder="event name"
          className="w-[30%]"
          onSearch={onSearch}
          enterButton
        />
        <div className="w-[30%] ml-10">
          <span>Loại:</span>
          {options && (
            <Select
              options={options}
              onChange={onSelect}
              placeholder="type event"
              className="w-[70%] ml-10"
              defaultValue="all"
            />
          )}
        </div>
        <div className="w-[30%] ml-10 flex items-center">
          <span>Ngày: </span>
          <Input
            className="ml-5"
            type="datetime-local"
            onChange={handleChangDate}
          />
        </div>
      </div>
      <Button
        type="primary"
        className="m-5 bg-green-500 float-right"
        onClick={() => {
          navigate('/event/add')
        }}
      >
        Thêm event mới
      </Button>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <div>
          <List
            className="mt-10"
            itemLayout="vertical"
            size="large"
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
            dataSource={res}
            renderItem={(item) => {
              return (
                <EventItem
                  item={item}
                  permissionsInfo={permissionsInfo}
                  showModal={showModal}
                  setIdDelete={setIdDelete}
                  handleDeleteEvent={handleDeleteEvent}
                  isModalOpen={isModalOpen}
                  handleCancel={handleCancel}
                />
              )
            }}
          />
        </div>
      )}
    </>
  )
}
export default EventPage
