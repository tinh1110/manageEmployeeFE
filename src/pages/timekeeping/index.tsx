import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layouts/main'
import { Button, Modal, Table, Upload, message } from 'antd'
import {
  exportTimeList,
  getTimeList,
  importTimeList,
} from '../../services/timekeeping'
import { calculateDayByMonth, convertDataSourceTimekeeping } from './helper'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'

const { Dragger } = Upload
const { Column, ColumnGroup } = Table

const propsDragger: UploadProps = {
  name: 'file',
  multiple: false,
  onChange(info) {
    console.log(info.fileList)
  },
  beforeUpload: () => false,
}
const TimekeepingPage = () => {
  const [data, setData] = useState([])
  const [month, setMonth] = useState<number>(30)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenModalImport, setIsOpenModalImport] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const handleOpenModalImport = () => {
    setIsOpenModalImport(true)
  }
  const handleCloseModalImport = () => {
    setIsOpenModalImport(false)
  }
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await getTimeList()
      setData(res.data.data.data)
      const month = res.data.data.month.split('-')[0]
      setMonth(calculateDayByMonth(Number(month)))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const res = await exportTimeList()
      const blob = new Blob([res.data], { type: res.headers['content-type'] })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'timekeeping.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      message.error('Export failed')
    }
  }
  const handleChangeFile = (info: any) => {
    const file = info.fileList
    setFile(file)
  }
  const handleImport = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file[0].originFileObj)
      await importTimeList(formData)
      message.success('Import success')
      handleCloseModalImport()
      fetchData()
    } catch (error) {
      message.error('Import failed')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const dataSource = convertDataSourceTimekeeping(data)
  const numberDay = Array.from({ length: month }, (_, index) => index + 1)
  return (
    <div>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button
            type="primary"
            className="mb-2"
            onClick={handleOpenModalImport}
          >
            Import
          </Button>
          <Button type="primary" className="mb-2" onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        scroll={{ x: 1500, y: 500 }}
        bordered
        pagination={false}
        loading={isLoading}
      >
        <Column
          title="Họ và Tên"
          dataIndex="name"
          key="name"
          width={150}
          fixed="left"
        />
        {numberDay.map((item, index) => {
          return (
            <ColumnGroup title={`Ngày ${item}`} key={index} width={200}>
              <Column
                title="In"
                dataIndex={`check-in-${item}`}
                key={`check-in-${item}`}
                width={100}
              />
              <Column
                title="Out"
                dataIndex={`check-out-${item}`}
                key={`check-out-${item}`}
                width={100}
              />
            </ColumnGroup>
          )
        })}
      </Table>

      {isOpenModalImport && (
        <Modal
          title="Import timekeeping"
          open={isOpenModalImport}
          onCancel={handleCloseModalImport}
          onOk={handleImport}
        >
          <Dragger {...propsDragger} onChange={handleChangeFile}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Modal>
      )}
    </div>
  )
}

export default TimekeepingPage
