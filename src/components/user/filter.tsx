import { Select, Input, Button } from 'antd'
import React, { useState, createContext } from 'react'
import { FilterType } from '../../types/user'
import { SelectRole } from './selectRole'
import { RoleSelect } from './roleSelect'

const { Search } = Input
const Filter = ({
  setFilter,
  filterValue,
}: {
  setFilter: any
  filterValue: FilterType
}) => {
  const handleSearch = (name: any, value: any) => {
    setFilter((filter: any) => ({ ...filter, [name]: value, page: 1 }))
  }
  const handleReset = () => {
    setFilter((filter: any) => ({
      page: 1,
    }))
  }
  return (
    <>
      <div className={'mb-12'}>
        <div className={'mr-6 inline'}>
          <label htmlFor="" className={'font-semibold mr-2'}>
            Giới tính
          </label>
          <Select
            onChange={(event) => handleSearch('gender', event)}
            value={filterValue?.gender}
            className={'w-28'}
            options={[
              { value: '2', label: 'Nữ' },
              { value: '1', label: 'Nam', checked: true },
              { value: '3', label: 'Khác' },
            ]}
          />
        </div>
        <div className={'mr-6 inline'}>
          <label htmlFor="" className={'font-semibold mr-2'}>
            Trạng thái
          </label>
          <Select
            onChange={(event) => handleSearch('status', event)}
            value={filterValue?.status}
            className={'w-28'}
            options={[
              { value: '1', label: 'Còn hoạt động' },
              { value: '0', label: 'Không hoạt động' },
            ]}
          />
        </div>
        <div className={'mr-6 inline'}>
          <label htmlFor="" className={'font-semibold mr-2'}>
            Chức vụ
          </label>
          <RoleSelect
            className=""
            handleCHange={handleSearch}
            setRole=""
            valueInput=""
          />
        </div>
        <div className={'mr-6 inline'}>
          <Button type="primary" onClick={handleReset}>
            Xóa hết
          </Button>
        </div>
        <div className={'mb-4 w-1/3 float-right'}>
          <Search
            name="searchInput"
            onSearch={(event) => handleSearch('search', event)}
            placeholder="Search for name or email"
            enterButton="Tìm kiếm"
            size="large"
            className={' float-right'}
          />
        </div>
      </div>
    </>
  )
}

export default Filter
