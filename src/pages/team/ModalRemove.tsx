import { Modal, Button } from 'antd'
import React from 'react'

interface Props {
  openModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
  blog: string
}

const ModalRemove: React.FC<Props> = ({ openModalDelete, onDelete, blog }) => {
  const toggleModalRemove = () => {
    openModalDelete(false)
  }

  return (
    <div>
      <Modal
        open={true}
        onCancel={() => toggleModalRemove()}
        title={blog}
        footer={[
          <Button danger type="primary" onClick={onDelete}>
            DELETE
          </Button>,
          <Button color="secondary" onClick={() => toggleModalRemove()}>
            CANCEL
          </Button>,
        ]}
      ></Modal>
    </div>
  )
}

export default ModalRemove
