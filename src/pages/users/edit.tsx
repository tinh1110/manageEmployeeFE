import { useEffect, useState } from 'react'
import MainLayout from '../../components/layouts/main'
import FormPost from '../../components/user/formPost'
import { userApiGetUser } from '../../services/request/user'
import Spinner from '../../components/user/spin'
import { Spin } from 'antd'

const UsersEdit = () => {
  const [userData, setUserData] = useState({})
  const [startDate, setStartDate] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const currentUrl = window.location.href
  let id: string = currentUrl.split('/')[5]
  useEffect(() => {
    userApiGetUser({ setUserData, setStartDate, setIsLoading }, id)
  }, [])

  return (
    <>
      <div className="mb-12">
        <h1 className="flex justify-center">Chỉnh sửa thông tin nhân viên</h1>
      </div>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <div className={'w-full grid place-items-center'}>
          <FormPost
            id={id}
            userData={userData}
            setStartDate={setStartDate}
            startDate={startDate}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      )}
    </>
  )
}

export default UsersEdit
