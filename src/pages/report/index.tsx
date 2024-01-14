import {
  Row,
  Col,
  Input,
  Form,
  Button,
  notification,
  Checkbox,
  Avatar,
} from 'antd'
import addRole from '../role/addRole'
import { useNavigate } from 'react-router-dom'
import { report } from '../../services/timekeeping'
import { ChangeEvent, useRef, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'

const ReportPage = () => {
  const [antForm] = Form.useForm()
  const navigate = useNavigate()
  const [checked, setChecked] = useState<boolean>(false)
  const inputRef = useRef(null)
  const [file, setFile] = useState<Array<any>>([])

  const handleSubmit = async () => {
    const values = antForm.getFieldsValue()
    try {
      handleUpdate(values)
    } catch (err) {
      return
    }
  }
  const handleUpdate = async (data: any) => {
    try {
      const formData: any = new FormData()
      if (file) {
        file.forEach((file1) => {
          formData.append('image[]', file1)
        })
      }

      formData.append('subject', data.subject || '')
      formData.append('report', data.report || '')
      formData.append('isAnonymous', checked)
      const res = await report(formData)
      notification['success']({
        message: 'Gửi phản hồi thành công',
        description: res.data.message,
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'message'
        notification['error']({
          key,
          duration: 5,
          message: 'Gửi phản hồi thất bại',
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
          message: 'Gửi phản hồi thất bại',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleCancel = () => {
    navigate('/')
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
  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    const inputRef = e.target

    if (e.target.files?.length) {
      setFile([...file, e.target.files[0]])
    }
    inputRef.value = ''
  }
  return (
    <div>
      <h1 className="flex items-center justify-center">
        Ý kiến đóng góp của nhân viên
      </h1>
      <Form name="update-profile" layout="vertical" form={antForm}>
        <Row>
          <Col span={12}>
            <Form.Item
              className="ml-10 mr-10"
              name="subject"
              label="Về vấn đề:"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="report" className="ml-10 mr-10 " label="Chi tiết:">
          <Input.TextArea rows={3} />
        </Form.Item>
        <p className="ml-10 mr-10 ">Ảnh đính kèm:</p>
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
            Gửi chế độ ẩn danh
          </Checkbox>
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Button
            type="dashed"
            className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Gửi phản hồi
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
    </div>
  )
}

export default ReportPage
