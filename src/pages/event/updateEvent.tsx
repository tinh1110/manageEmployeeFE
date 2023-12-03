import {
  Row,
  Input,
  Select,
  Form,
  DatePicker,
  Col,
  Checkbox,
  Button,
  Avatar,
  notification,
  Spin,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../../components/layouts/main'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { editEvent, getTypeEvent, updateEvent } from '../../services/event'
import { TypeEvent } from '../../types/event'

const UpdateEventPage = () => {
  const [file, setFile] = useState<Array<any>>([])
  const [fileDelete, setFileDelete] = useState<Array<string>>([])
  const inputRef = useRef(null)
  const { id } = useParams<{ id: string }>()
  const [res, setRes] = useState<TypeEvent>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([])
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    handleGetTypeEvent()
  }, [])
  const handleGetTypeEvent = async () => {
    try {
      const response = await getTypeEvent()
      const options = response.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))
      setOptions(options)
    } catch (err: any) {
      notification['error']({
        duration: 5,
        message: 'Get type event failed',
        description: err.message,
      })
    }
  }
  useEffect(() => {
    const handleGetDetailEvent = async () => {
      setIsLoading(true)
      try {
        if (id) {
          const response = await editEvent(id)
          setRes(response.data.data)
          setIsLoading(false)
        }
      } catch (err: any) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .map((message) => `- ${message}<br>`)
            .join('')
          const key = 'updatable'
          notification['error']({
            key,
            duration: 5,
            message: 'Get detail event failed',
            description: (
              <div
                dangerouslySetInnerHTML={{ __html: errorMessages }}
                className="text-red-500"
              />
            ),
          })
        } else {
          notification['error']({
            message: 'Get detail event failed',
            duration: 5,
            description: err.response.data.message,
          })
        }
        setIsLoading(false)
      }
    }
    handleGetDetailEvent()
  }, [])

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    const inputRef = e.target

    if (e.target.files?.length) {
      setFile([...file, e.target.files[0]])
    }
    inputRef.value = ''
  }
  const navigate = useNavigate()
  const [antForm] = Form.useForm()
  dayjs.extend(customParseFormat)
  const { RangePicker } = DatePicker
  const handleSubmit = async () => {
    const values = antForm.getFieldsValue()
    try {
      await antForm.validateFields()
      handleUpdate(values)
    } catch (err) {
      return
    }
  }
  const handleCancel = () => {
    navigate('/events')
  }
  const handleUpdate = async (data: any) => {
    try {
      const formData: any = new FormData()
      if (file.length) {
        file.forEach((file1) => {
          formData.append('image[]', file1)
        })
      }
      if (fileDelete.length) {
        fileDelete.forEach((name) => {
          formData.append('delete[]', name)
        })
      }

      formData.append('name', data.name)
      formData.append('link', data.link || '')
      formData.append('location', data.location || '')
      formData.append('description', data.details || '')
      formData.append('sendMail', checked)
      formData.append('type', data.type)
      formData.append('_method', 'PUT')
      if (data?.time) {
        formData.append(
          'start_time',
          dayjs(data.time[0]).format('YYYY-MM-DD HH:mm:ss'),
        )
        formData.append(
          'end_time',
          dayjs(data.time[1]).format('YYYY-MM-DD HH:mm:ss'),
        )
      }
      if (id) {
        const res = await updateEvent(formData, id)
        notification['success']({
          message: 'Update successful',
          description: res.data.message,
        })
      }

      navigate('/events')
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Update Event failed',
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
          message: 'Update Event failed',
          description: err.response.data.message,
        })
      }
    }
  }
  const renderFilePreview = () => {
    const chunks: Array<any> = []
    const chunkSize = 6
    if (file.length) {
      for (let i = 0; i < file.length; i += chunkSize) {
        const chunk = file.slice(i, i + chunkSize)
        chunks.push(chunk)
      }
      return chunks.map((chunk, index) => (
        <div className="flex justify-center ml-10 mb-4" key={index}>
          {chunk.map((filee: any, fileIndex: number) => (
            <div key={fileIndex}>
              <p>Tên tệp: {filee.name}</p>
              <Button
                icon={<CloseOutlined className="w-[10px] h-[10px]" />}
                onClick={() => handleFileDelete(fileIndex)}
              />
              <Avatar
                src={URL.createObjectURL(filee)}
                alt="avatar"
                className="w-[150px] h-[150px] flex justify-center m-1"
              ></Avatar>
            </div>
          ))}
        </div>
      ))
    }
  }
  const renderOleFile = () => {
    const chunks: Array<any> = []
    const chunkSize = 6
    if (res?.image.length) {
      for (let i = 0; i < res?.image.length; i += chunkSize) {
        const chunk = res?.image.slice(i, i + chunkSize)
        chunks.push(chunk)
      }
      return chunks.map((chunk, index) => (
        <div className="flex justify-center ml-10 mb-4" key={index}>
          {chunk.map((url: string, index: number) => (
            <div key={index} className="flex justify-center ml-10 mb-4">
              <Button
                icon={<CloseOutlined className="w-[10px] h-[10px]" />}
                onClick={() =>
                  handleOldFileDelete(
                    url.replace('http://127.0.0.1:8000/storage/', ''),
                    index,
                  )
                }
              />
              <Avatar
                src={url}
                alt="avatar"
                className="w-[150px] h-[150px] flex justify-center m-1"
              ></Avatar>
            </div>
          ))}
        </div>
      ))
    }
  }
  const handleFileDelete = (index: number) => {
    const updatedFile = [...file]
    updatedFile.splice(index, 1)
    setFile(updatedFile)
  }

  const handleOldFileDelete = (name: string, index: number) => {
    res?.image.splice(index, 1)
    setFileDelete([...fileDelete, name])
  }
  return (
    <>
      <h1 className="text-sky-500 flex justify-center">Sửa event </h1>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <Form layout="vertical" form={antForm}>
          <Row>
            <Col span={12}>
              <Form.Item
                className="ml-10 mr-10"
                name="name"
                label="Tên event"
                initialValue={res?.name}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="ml-10 mr-10"
                name="type"
                label="Loại event"
                initialValue={res?.type}
              >
                {options && (
                  <Select
                    options={options}
                    placeholder="type event"
                    className="w-[70%] "
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                className=" ml-10 mr-10"
                name="time"
                label="Thời gian tổ chức"
                initialValue={[dayjs(res?.start_time), dayjs(res?.end_time)]}
              >
                <RangePicker
                  className="w-full"
                  presets={[
                    {
                      label: (
                        <span aria-label="Current Time to End of Day"></span>
                      ),
                      value: () => [dayjs(), dayjs().endOf('day')],
                    },
                  ]}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                className="ml-10 mr-10"
                name="location"
                label="Địa điểm"
                initialValue={res?.location}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="ml-10 mr-10"
                name="link"
                label="Link"
                initialValue={res?.link}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="details"
            className="ml-10 mr-10 "
            label="Description"
            initialValue={res?.description}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <p className="ml-10 mr-10 ">Ảnh cũ:</p>
          <div className="justify-center ml-10 mb-4">{renderOleFile()}</div>

          <p className="ml-10 mr-10 ">Thêm ảnh mới:</p>
          <div className="justify-center ml-10 mb-4">{renderFilePreview()}</div>
          <div className="flex justify-center ml-10 mb-4">
            <input
              ref={inputRef}
              type="file"
              name="image"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
          <Form.Item className="ml-10 mr-10" name="sendMail">
            <Checkbox
              checked={checked}
              onChange={(event: any) => {
                setChecked(event.target.checked)
              }}
            >
              Gửi mail cho tất cả nhân viên
            </Checkbox>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              type="dashed"
              className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
              htmlType="submit"
              onClick={handleSubmit}
            >
              Sửa event
            </Button>
            <Button
              type="dashed"
              className="w-[110px] text-white bg-red-500 m-5 items-center rounded-full"
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  )
}
export default UpdateEventPage
