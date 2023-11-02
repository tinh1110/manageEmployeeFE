import { Select, Input, Button, notification } from 'antd'
import { FilterType } from '../../types/user'
import { RoleSelect } from './roleSelect'
import { dowloadUser } from '../../services/importUser'

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
  const handleDownload = async () => {
    try {
      const res = await dowloadUser(filterValue).then((response) => {
        const fileUrl = URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = fileUrl
        link.setAttribute('download', 'users.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'message'
        notification['error']({
          key,
          duration: 5,
          message: 'Delete role failed',
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
          message: 'Delete role failed',
          description: err.response.data.message,
        })
      }
    }
  }
  return (
    <>
      <div className={'mr-10 w-1/4'}>
        <Search
          name="searchInput"
          onSearch={(event) => handleSearch('search', event)}
          placeholder="Search for name or email"
          enterButton="Tìm kiếm"
          size="middle"
          className={' float-left'}
        />
      </div>
      <div className={'mr-6 inline'}>
        <label htmlFor="" className={'font-semibold ml-3 mr-2'}>
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
            { value: '0', label: 'Còn hoạt động' },
            { value: '1', label: 'Không hoạt động' },
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
      <Button className="mr-3 float-right bg-sky-500" onClick={handleDownload}>
        Export User
      </Button>
    </>
  )
}

export default Filter
