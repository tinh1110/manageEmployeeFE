import {
  Avatar,
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  notification,
} from 'antd'
import { useEffect, useState } from 'react'
import { detailIssue } from '../../services/request/issue'
import React from 'react'
import { FileTextOutlined } from '@ant-design/icons'
import { TagPriority, TagPriority2, TagStatus } from '../team/components'
import Table, { ColumnsType } from 'antd/es/table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import IssueComment from './issueComment'
import useravt from '../../assets/user.png'
import { FireOutlined } from '@ant-design/icons'
import style from 'antd/es/alert/style'

const IssueUpdatePage = () => {
  const [res, setRes] = useState<any>()
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [children, setChildren] = useState<any>()
  const navigate = useNavigate()
  useEffect(() => {
    const handleGetDetailEvent = async () => {
      setIsLoading(true)
      try {
        if (id) {
          const response = await detailIssue(id)
          setRes(response.data.data)
          setChildren(response.data.data.children)
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
            message: 'Get detail issue failed',
            description: (
              <div
                dangerouslySetInnerHTML={{ __html: errorMessages }}
                className="text-red-500"
              />
            ),
          })
        } else {
          notification['error']({
            message: 'Get detail issue failed',
            duration: 5,
            description: err.response.data.message,
          })
        }
        setIsLoading(false)
      }
    }
    handleGetDetailEvent()
  }, [id])

  const columns: ColumnsType<any> = [
    {
      title: 'Loại',
      dataIndex: 'parent_id',
      key: 'parent_id',
      render: (row: any) => {
        if (!row) return <Tag color="green">Task lớn</Tag>
        return <Tag color="red">Task nhỏ</Tag>
      },
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'subject',
      key: 'subject',
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => navigate(`/projects/issues/${data.id}`)}>
            {data.subject}
          </a>
        </Space>
      ),
    },
    {
      title: 'Người nhận',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (row) => {
        return (
          <div>
            <Avatar src={row?.avatar || useravt} />
            <span className="ml-2">{row.name}</span>
          </div>
        )
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (row) => {
        return TagStatus(row)
      },
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (row) => {
        return TagPriority2(row)
      },
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text) => {
        const endTime = new Date(text) // Chuyển đổi giá trị `end_time` thành đối tượng Date
        const now = new Date() // Declare `now` here
        // So sánh `end_time` với `now`
        const isExpired = endTime <= now

        // Kiểm tra nếu `end_time` đã hết hạn
        if (isExpired) {
          return (
            <span style={{ color: 'red' }}>
              {text} <FireOutlined />
            </span>
          )
        }

        return text
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (row) => {
        return (
          <div>
            <Avatar src={row?.avatar || useravt} />
            <span className="ml-2">{row.name}</span>
          </div>
        )
      },
    },
  ]

  return (
    <>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <div className="bg-neutral-100">
          <h1 className="text-black flex justify-center">
            Dự án {res?.project}
          </h1>

          <Button
            className="m-5"
            onClick={() => {
              navigate(`/projects/${res?.project_id}`)
            }}
          >
            Quay lại
          </Button>

          <Row>
            <Col span={12}>
              <h2 className="text-black m-0 ml-5">
                <FileTextOutlined /> {res?.subject}
              </h2>
            </Col>
            <Col span={12} className="flex justify-end">
              <span
                className={
                  res?.end_date && new Date(res.end_date) <= new Date()
                    ? 'mr-5 text-red-500'
                    : 'mr-5'
                }
              >
                Due date: {res?.end_date}
                {res?.end_date && new Date(res.end_date) <= new Date() && (
                  <FireOutlined style={{ marginLeft: '5px' }} />
                )}
              </span>
              <span className="mr-5">{TagStatus(res?.status)}</span>
            </Col>
          </Row>
          <div className="bg-white m-5 border-10">
            <div className="pt-1">
              <div className="flex m-2">
                {
                  <Avatar
                    src={res?.created_by?.avatar || './user.png'}
                    className="w-[40px] h-[40px] "
                  />
                }
                <div className="">
                  <p className="text-[15px] font-bold m-1">
                    {res?.created_by?.name}
                  </p>
                  <span className="text-[12px] m-1">
                    Created {res?.created_at}
                  </span>
                </div>{' '}
                <div className="flex-grow"></div>
                <div className="h-[10%] flex justify-end mr-5">
                  <Link to={`/projects/${res?.project_id}/issues/edit/${id}`}>
                    <Button
                      type="primary"
                      onClick={() => {}}
                      className=" text-white bg-green-500 m-1 rounded-full"
                    >
                      <EditOutlined />
                    </Button>
                    {/* <Modal
                    title="Delete Event"
                    open={isModalOpen}
                    onOk={() => handleDeleteEvent()}
                    onCancel={handleCancel}
                  > */}
                    {/* <p>"Are you sure to delete this event?"</p>
                  </Modal> */}
                  </Link>
                </div>
              </div>
            </div>

            <div className="m-2 ml-7 mb-5">
              {res?.description
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((line: any, index: any) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </div>
            {res?.image &&
              res?.image.map((item1: any, index: any) => (
                <img
                  key={index}
                  src={item1}
                  className="w-[20%] h-[200px] m-5"
                  alt=""
                />
              ))}
            <Row className="m-5 mr-10">
              <Col span={12}>
                <hr className="mr-[20%]" />
                <span>
                  Độ ưu tiên
                  <span className="ml-[50%]">
                    {' '}
                    {TagPriority2(res?.priority)}
                  </span>
                </span>
              </Col>
              <Col span={12}>
                <hr className="mr-[10%]" />
                <span>
                  Người nhận
                  <span className="ml-[45%]">
                    <Avatar
                      src={res?.assignee?.avatar || useravt}
                      className="w-[40px] h-[40px] "
                    />{' '}
                    {res?.assignee.name}
                  </span>
                </span>
              </Col>
            </Row>
            <Row className="ml-5 mr-10 h-[80px]">
              <Col span={12}>
                <hr className="mr-[20%]" />
                <span>
                  Ngày bắt đầu
                  <span className="ml-[50%]">{res?.start_date}</span>
                </span>
              </Col>
              <Col span={12}>
                <hr className="mr-[10%]" />
                Ngày kết thúc
                <span>
                  <span
                    className={
                      res?.end_date && new Date(res.end_date) <= new Date()
                        ? 'mr-5 ml-[45%] text-red-500'
                        : 'mr-5 ml-[45%]'
                    }
                  >
                    Due date: {res?.end_date}
                    {res?.end_date && new Date(res.end_date) <= new Date() && (
                      <FireOutlined style={{ marginLeft: '5px' }} />
                    )}
                  </span>
                </span>
              </Col>
            </Row>
          </div>
          {/* <Row className="mt-2">
              <p>{res?.description} </p>
            </Row> */}
          <div className="bg-white m-5 border-10">
            <div className="pt-1">
              <div className="flex m-2 font-bold">Task phụ</div>
              <Table className="mt-3" columns={columns} dataSource={children} />
            </div>
          </div>

          <div className="bg-white m-5 border-10">
            <IssueComment issue_id={res?.id} />
          </div>
        </div>
      )}
    </>
  )
}

export default IssueUpdatePage
