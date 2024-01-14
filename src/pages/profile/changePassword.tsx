import { Button, Col, Form, Input, Row, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../services/profile'

const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const [antForm] = Form.useForm()
  const handleSubmit = async () => {
    const values = antForm.getFieldsValue()
    try {
      const res = await changePassword(values)
      notification['success']({
        message: 'Đổi mật khẩu thành công',
        description: res.data.message,
      })
      navigate('/profile')
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Đổi mật khẩu thất bại',
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
          message: 'Đổi mật khẩu thất bại',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleCancel = () => {
    navigate('/profile')
  }
  return (
    <>
      <h1 className="text-black-500 flex justify-center">Đổi mật khẩu</h1>
      <Form name="update-profile" layout="vertical" form={antForm}>
        <Row className="flex justify-center">
          <Col span={11}>
            <Form.Item
              name="old_password"
              className="ml-10 mr-10 font-bold"
              label="Mật khẩu cũ"
            >
              <Input type="password" name="old_password" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-center">
          <Col span={11}>
            <Form.Item
              name="password"
              className="ml-10 mr-10 font-bold"
              label="Mật khẩu mới"
            >
              <Input type="password" name="password" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-center">
          <Col span={11}>
            <Form.Item
              name="password_confirmation"
              className="ml-10 mr-10 font-bold"
              label="Nhập lại mật khẩu"
            >
              <Input type="password" name="password_confirmation" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-center">
          <Form.Item className="flex justify-center">
            <Button
              type="dashed"
              className="w-[100px] text-white m-5 bg-green-500  rounded-full"
              htmlType="submit"
              onClick={handleSubmit}
            >
              Cập nhật
            </Button>
            <Button
              type="dashed"
              className="w-[100px] text-white bg-red-500 m-5  rounded-full"
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  )
}

export default ChangePasswordPage
