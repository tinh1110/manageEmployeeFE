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
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FormInstance } from 'antd/es/form'
import TextArea from 'antd/es/input/TextArea'
import { addTeam, editTeam, updateTeam } from '../../services/request/team'
import { LIST_GENDER, LIST_STATUS_PROJECT } from '../../libs/constants/Options'

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

const UpdateTeam = () => {
  const dateFormat = 'YYYY-MM-DD'
  const [antForm] = Form.useForm()
  const navigate = useNavigate()
  const [listAllUser, setListAllUser] = useState<User[]>([])
  const [leader_id, setLeader_id] = useState<string>('')
  const [res, setRes] = useState<any>()
  const { id } = useParams<{ id: string }>()
  useEffect(() => {
    const handleGetDetailEvent = async () => {
      setIsLoading(true)
      try {
        if (id) {
          const response = await editTeam(id)
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
            message: 'Get detail project failed',
            description: (
              <div
                dangerouslySetInnerHTML={{ __html: errorMessages }}
                className="text-red-500"
              />
            ),
          })
        } else {
          notification['error']({
            message: 'Get detail project failed',
            duration: 5,
            description: err.response.data.message,
          })
        }
        setIsLoading(false)
      }
    }
    handleGetDetailEvent()
  }, [])
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
    try {
      if (id) {
        const res = await updateTeam(values, id)
        notification['success']({
          message: 'Update dự án thành công',
          description: res.data.message,
        })
        navigate('/projects')
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
          message: 'Update dự án thất bại',
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
          message: 'Update dự án thất bại',
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
        <h1>Sửa dự án </h1>
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
                  label="Tên dự án"
                  initialValue={res?.name}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="leader_id"
                  label="Leader"
                  className="mr-10"
                  initialValue={res?.leader?.id}
                >
                  <Select
                    size="large"
                    allowClear
                    showSearch
                    placeholder={'Chọn leader'}
                    onChange={handleChange}
                    onSearch={(e) => handleSearch(e)}
                    filterOption={() => true}
                    defaultValue={parseInt(res?.leader?.id)}
                  >
                    {listAllUser.map((user: User) => (
                      <Option key={user.id} value={user.id}>
                        {user.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Thời gian dự án" className="ml-10 mr-10">
                  <Row className="flex justify-between">
                    <Col span={11}>
                      <Form.Item
                        name="start_time"
                        key="start_time"
                        initialValue={`${res?.start_time}`}
                      >
                        <Input type="date" value={`${res?.start_time}`} />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name="end_time"
                        key="end_time"
                        initialValue={`${res?.end_time}`}
                      >
                        <Input type="date" value={`${res?.end_time}`} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="mr-10"
                  name="customer"
                  label="Khách hàng"
                  initialValue={res?.customer}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className="ml-10 mr-10"
                  name="status"
                  label="Trạng thái"
                  initialValue={res?.status}
                >
                  <Select
                    defaultValue={res?.status}
                    options={LIST_STATUS_PROJECT}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="details"
              className="ml-10 mr-10 "
              label="Details"
              initialValue={res?.details}
            >
              <Input.TextArea rows={3} value={res?.details} />
            </Form.Item>

            <Form.Item className="flex justify-center">
              <Button
                type="dashed"
                className="w-[110px] text-white m-5 bg-green-500 items-center rounded-full"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Sửa dự án
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

export default UpdateTeam
