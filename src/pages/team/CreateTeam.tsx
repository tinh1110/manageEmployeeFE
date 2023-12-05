import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  message,
  notification,
} from 'antd'
import MainLayout from '../../components/layouts/main'
import axiosInstance from '../../services/request/base'
import { User, Team } from '../../components/teams/interface'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FormInstance } from 'antd/es/form'
import TextArea from 'antd/es/input/TextArea'
import { addTeam, editTeam } from '../../services/request/team'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const summitButtonLayout = {
  wrapperCol: {
    sm: {
      offset: 10,
    },
  },
}

const errorValidate = {
  wrapperCol: {
    sm: {
      offset: 4,
    },
  },
}

const CreateTeam = () => {
  const dateFormat = 'YYYY-MM-DD'
  const [antForm] = Form.useForm()
  const navigate = useNavigate()
  const [listAllUser, setListAllUser] = useState<User[]>([])
  const [leader_id, setLeader_id] = useState<string>('')
  const [filter, setFilter] = useState({
    search: '',
  })
  const [filterTeam, setFilterTeam] = useState({
    name: '',
  })
  const { Option } = Select
  const [listAllTeam, setListAllTeam] = useState<Team[]>([])
  const location = useLocation()
  const formRef = React.useRef<FormInstance>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getAllUserVer2()
    getAllTeam2()
  }, [])

  const getAllTeam2 = async () => {
    const res = await axiosInstance.get(`/team/all-list-main-team`)
    setListAllTeam(res.data.data)
    setIsLoading(false)
  }

  const getAllUserVer2 = async () => {
    const res = await axiosInstance.get(`/get-all`)
    setListAllUser(res.data.data)
  }

  const getAllUser = async () => {
    const url = new URLSearchParams(filter)
    const res = await axiosInstance.get(`/user?${url}`)
    if (filter.search === '') {
      setListAllUser([])
    } else {
      setListAllUser(res.data.data.records)
    }
  }

  const handleChange = (value: number | undefined) => {
    if (!value) {
      return
    } else {
      setLeader_id(value.toString())
    }
  }

  const handleSearch = (data: string) => {
    setFilter({ search: data })
    if (data === '') {
    } else {
      getAllUser()
    }
  }

  const handleSubmit = async () => {
    const values = antForm.getFieldsValue()
    console.log(values)
    try {
      const res = await addTeam(values)
      notification['success']({
        message: 'Thêm dự án thành công',
        description: res.data.message,
      })
      navigate('/projects')
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Thêm dự án thất bại',
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
          message: 'Thêm dự án thất bại',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleCancel = () => {
    navigate('/projects')
  }
  return (
    <>
      <div className="... flex items-center justify-center">
        <h1>Thêm Dự án mới</h1>
      </div>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <>
          <Form name="update-profile" layout="vertical" form={antForm}>
            <Row>
              <Col span={12}>
                <Form.Item
                  className="ml-10 mr-10"
                  name="name"
                  label="Tên Dự án"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="leader_id" label="Leader" className="mr-10">
                  <Select
                    size="large"
                    allowClear
                    showSearch
                    placeholder={'Chọn leader'}
                    onChange={handleChange}
                    onSearch={(e) => handleSearch(e)}
                    filterOption={() => true}
                  >
                    {listAllUser.map((user) => {
                      return (
                        <Option key={user.id} value={user.id}>
                          {user.name}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Thời gian dự án" className="ml-10 mr-10">
                  <Row className="flex justify-between">
                    <Col span={11}>
                      <Form.Item name="start_time" key="start_time">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item name="end_time" key="end_time">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="mr-10" name="customer" label="Khách hàng">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="details" className="ml-10 mr-10 " label="Details">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item className="flex justify-center">
              <Button
                type="dashed"
                className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Thêm dự án
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

export default CreateTeam
