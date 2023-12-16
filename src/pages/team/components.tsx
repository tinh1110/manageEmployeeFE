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
