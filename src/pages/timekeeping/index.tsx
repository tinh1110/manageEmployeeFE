import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layouts/main'
import { Table } from 'antd'
import { getTimeList } from '../../services/timekeeping'
import { calculateDayByMonth, convertDataSourceTimekeeping } from './helper'

const { Column, ColumnGroup } = Table
const TimekeepingPage = () => {
  const [data, setData] = useState([])
  const [month, setMonth] = useState<number>(30)
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  useEffect(() => {
    fetchData()
  }, [])
  const dataSource = convertDataSourceTimekeeping(data)
  const numberDay = Array.from({ length: month }, (_, index) => index + 1)
  return (
    <div>
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
    </div>
  )
}

export default TimekeepingPage
