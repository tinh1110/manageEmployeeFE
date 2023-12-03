import MainLayout from '../../components/layouts/main'
import FormPost from '../../components/user/formPost'
import { useEffect, useState } from 'react'

const UsersAdd = () => {
  const [startDate, setStartDate] = useState()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div className="mb-12">
        <h1 className="flex justify-center">Thêm nhân viên</h1>
      </div>
      <div className={'w-full grid place-items-center'}>
        <FormPost
          setStartDate={setStartDate}
          startDate={startDate}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  )
}

export default UsersAdd
