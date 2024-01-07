import { Modal, Tag } from 'antd'
import React from 'react'

interface IProps {
  data: string[]
  isOpen: boolean
  onClose: () => void
}
const DetailPermissions: React.FC<IProps> = ({ data, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onClose}>
      <div className="p-2">Detail Permissions</div>
      <div>
        {data.map((permission) => {
          return (
            <Tag color="green" key={permission}>
              {permission}
            </Tag>
          )
        })}
      </div>
    </Modal>
  )
}

export default DetailPermissions
