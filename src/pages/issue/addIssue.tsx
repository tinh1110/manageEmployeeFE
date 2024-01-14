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
  message,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { addEvent } from '../../services/event'
import { addIssue, parentIssue, userAll } from '../../services/request/issue'
import { LIST_PRIORITY } from '../team/components'
const AddIssuePage = () => {
  const [file, setFile] = useState<Array<any>>([])
  const [checked, setChecked] = useState<boolean>(false)
  const inputRef = useRef(null)
  const { id } = useParams()
  const [options, setOptions] = useState<
    Array<{ value: number; label: string }>
  >([])
  const [options2, setOptions2] = useState<
    Array<{ value: number; label: string }>
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    handleGetParentIssue()
    handleGetUser()
  }, [])
  const handleGetParentIssue = async () => {
    setIsLoading(true)
    try {
      if (id) {
        const response = await parentIssue(id)
        const options = response.data.data.records.map((item: any) => ({
          value: item.id,
          label: item.subject,
        }))
        setOptions(options)
      }

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
          message: 'Get parent issue failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          message: 'Get parent issue failed',
          duration: 5,
          description: err.response.data.message,
        })
      }
      setIsLoading(false)
    }
  }

  const handleGetUser = async () => {
    setIsLoading(true)
    try {
      if (id) {
        const response = await userAll(id)
        const options = response.data.data.records.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
        setOptions2(options)
      }

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
          message: 'Get user failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          message: 'Get user failed',
          duration: 5,
          description: err.response.data.message,
        })
      }
      setIsLoading(false)
    }
  }

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
    navigate(`/projects/${id}`)
  }
  const handleUpdate = async (data: any) => {
    try {
      const formData: any = new FormData()
      if (file) {
        file.forEach((file1) => {
          formData.append('image[]', file1)
        })
      }

      formData.append('assignee_id', data.assignee_id || '')
      formData.append('project_id', id || '')
      formData.append('subject', data.subject || '')
      formData.append('parent_id', data.parent_id || '')
      formData.append('description', data.description || '')
      formData.append('start_date', data.start_date)
      formData.append('end_date', data.end_date)
      formData.append('priority', data.priority || 1)
      formData.append('status', 1)

      const res = await addIssue(formData)
      notification['success']({
        message: 'Add issue successful',
        description: res.data.message,
      })
      navigate(`/projects/${id}`)
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'message'
        notification['error']({
          key,
          duration: 5,
          message: 'Add issue failed',
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
          message: 'Add issue failed',
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
  const handleFileDelete = (index: number) => {
    const updatedFile = [...file]
    updatedFile.splice(index, 1)
    setFile(updatedFile)
  }
  return (
    <>
      <h1 className="text-sky-500 flex justify-center">Thêm issue mới </h1>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <>
          <Form name="update-profile" layout="vertical" form={antForm}>
            <Row>
              <Col span={12}>
                <Form.Item
                  className="ml-10 mr-10"
                  name="subject"
                  label="Tiêu đề"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="ml-10 mr-10"
                  name="parent_id"
                  label="Issue cha"
                >
                  {
                    <Select
                      options={options}
                      placeholder="parent"
                      className="w-[70%] "
                    />
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Thời gian làm" className="ml-10 mr-10">
                  <Row className="flex justify-between">
                    <Col span={11}>
                      <Form.Item name="start_date" key="start_date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                    <span className="mt-2">{`->`}</span>
                    <Col span={11}>
                      <Form.Item name="end_date" key="end_date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>{' '}
              <Col span={5}>
                <Form.Item
                  className="ml-10 mr-10"
                  name="priority"
                  label="Độ ưu tiên"
                >
                  {
                    <Select
                      options={LIST_PRIORITY}
                      placeholder="priority"
                      className="w-[70%] "
                    />
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className="ml-10 mr-10"
                  name="assignee_id"
                  label="Người nhận"
                >
                  {
                    <Select
                      options={options2}
                      placeholder="assignee"
                      className="w-[70%] "
                    />
                  }
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              className="ml-10 mr-10 "
              label="Description"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <div className="justify-center ml-10 mb-4">
              {renderFilePreview()}
            </div>
            <div className="flex justify-center ml-10 mb-4">
              <input
                ref={inputRef}
                type="file"
                name="image"
                onChange={(e) => handleChangeFile(e)}
              />
            </div>

            <Form.Item className="flex justify-center">
              <Button
                type="dashed"
                className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Thêm issue
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
        </>
      )}
    </>
  )
}
export default AddIssuePage
