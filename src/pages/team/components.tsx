import { Tag } from 'antd'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'

export const TagStatus = (status: number) => {
  let color = ''
  let text = ''
  switch (status) {
    case 1:
      color = 'green'
      text = 'Đang mở'
      break
    case 2:
      color = 'red'
      text = 'Trong tiến tình'
      break
    case 3:
      color = 'blue'
      text = 'Hoàn Thành'
      break
    case 4:
      color = 'orange'
      text = 'Tạm dừng'
      break
    case 5:
      color = 'purple'
      text = 'Đóng'
      break
    case 6:
      color = 'yellow'
      text = 'Tất cả'
      break
    default:
      color = 'green'
      text = 'Open'
      break
  }

  return <Tag color={color}>{text}</Tag>
}

export const TagPriority = (priority: number) => {
  let color = 'green'
  let Icon = ArrowDownOutlined
  switch (priority) {
    case 1:
      color = 'green'
      Icon = ArrowDownOutlined
      break
    case 2:
      color = 'blue'
      Icon = ArrowRightOutlined
      break
    case 3:
      color = 'red'
      Icon = ArrowUpOutlined
      break
  }
  return (
    <>
      <Icon twoToneColor={color} />
    </>
  )
}

export const TagPriority2 = (priority: number) => {
  let color = 'green'
  let Icon = ArrowDownOutlined
  let text = 'Low'
  switch (priority) {
    case 1:
      color = 'green'
      Icon = ArrowDownOutlined
      text = 'Low'
      break
    case 2:
      color = 'blue'
      Icon = ArrowRightOutlined
      text = 'Normal'
      break
    case 3:
      color = 'red'
      Icon = ArrowUpOutlined
      text = 'High'
      break
  }
  return (
    <>
      <Icon twoToneColor={color} className="mr-2" />
      <Tag color={color}>{text}</Tag>
    </>
  )
}

export const LIST_PRIORITY = [
  {
    label: TagPriority2(1),
    value: 1,
  },
  {
    label: TagPriority2(2),
    value: 2,
  },
  {
    label: TagPriority2(3),
    value: 3,
  },
]

export const LIST_STATUS_ISSUE = [
  {
    label: TagStatus(1),
    value: 1,
  },
  {
    label: TagStatus(2),
    value: 2,
  },
  {
    label: TagStatus(3),
    value: 3,
  },
  {
    label: TagStatus(4),
    value: 4,
  },
  {
    label: TagStatus(5),
    value: 5,
  },
]
