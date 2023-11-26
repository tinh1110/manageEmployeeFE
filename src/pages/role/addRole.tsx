import { Button, Col, Form, Input, Row, notification } from 'antd'
import MainLayout from '../../components/layouts/main'
import { useNavigate } from 'react-router-dom'
import { addRole } from '../../services/role'

const AddRolePage = () => {
  const [antForm] = Form.useForm()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    const values = antForm.getFieldsValue()

    try {
      const res = await addRole(values)
      notification['success']({
        message: 'Add role successful',
        description: res.data.message,
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Add role failed',
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
          message: 'Add role failed',
          description: err.response.data.message,
        })
      }
    }
    navigate('/roles/')
  }
  const handleCancel = () => {
    navigate('/roles/')
  }

  return (
    <>
      <h1 className="text-sky-500 flex justify-center">Thêm role mới</h1>
      <Form name="update-profile" layout="vertical" form={antForm}>
        <Row>
          <Col span={12}>
            <Form.Item
              className="ml-10 mr-10"
              name="role_name"
              label="Tên role"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" className="ml-10 mr-10 " label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Button
            type="dashed"
            className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Thêm role
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
  )
}

export default AddRolePage
