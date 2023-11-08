import { useEffect, useState } from 'react'
import MainLayout from '../../components/layouts/main'
import { profile, userProfile } from '../../services/profile'
import { Avatar, Button, Spin, notification } from 'antd'
import {
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import { UPDATE_PROFILE } from '../../libs/constants/Permissions'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
import userdefault from '../../assets/user.png'
const UserProfilePage = () => {
  const permissionsInfo = getPermissions()
  const [res, setRes] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  console.log(id)
  useEffect(() => {
    setIsLoading(true)
    const handleGetProfile = async () => {
      try {
        if (id) {
          const response = await userProfile(id)
          // Lưu trữ giá trị res vào state
          setIsLoading(false)
          setRes(response.data.data)
        }
      } catch (err: any) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .map((message) => `- ${message}<br>`)
            .join('')
          const key = 'updatable'
          notification['error']({
            key,
            duration: 5,
            message: 'Get profile failed',
            description: (
              <div
                dangerouslySetInnerHTML={{ __html: errorMessages }}
                className="text-red-500"
              />
            ),
          })
        } else {
          notification['error']({
            message: 'Get profile failed',
            duration: 5,
            description: err.response.data.message,
          })
        }
        setIsLoading(false)
      }
    }

    handleGetProfile()
  }, [])

  const genderLabel = (gender: number): string => {
    switch (gender) {
      case 1:
        return 'Nam'
      case 2:
        return 'Nữ'
      default:
        return 'Khác'
    }
  }

  return (
    <MainLayout>
      <h1 className="text-orange-500 flex justify-center">Thông tin cá nhân</h1>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <>
          <div className=" w-full h-[550px] flex ">
            <div className="bg-orange-500 w-1/3 h-550 ">
              <div className="flex justify-center mt-[5%]">
                <Avatar
                  src={res?.avatar || userdefault}
                  className="w-[200px] h-[200px] rounded-full flex justify-center"
                ></Avatar>
              </div>
              <h2 className="text-white flex justify-center">
                {res?.name || ''}
              </h2>
              <h3 className="text-white flex justify-center">
                {res?.role || ''}
              </h3>
              <p className="text-base text-white flex justify-center m-10">
                Bằng năng lực chuyên môn và sự thấu hiểu, chúng tôi cung cấp
                giải pháp công nghệ và chuyển đổi số để tối ưu hóa quy trình và
                nâng cao hiệu suất công việc, góp phần thúc đẩy sự thành công
                của khách hàng.
              </p>
            </div>
            <div className="w-1/3 h-full m-[20px] ">
              <h1 className="flex justify-center">Chi tiết</h1>
              <h3 className="ml-10">
                <MailOutlined className="mr-2" />
                Email:
              </h3>
              <span className="ml-10">{res?.email || ''}</span>
              <h3 className="ml-10">
                <PhoneOutlined className="mr-2" />
                Số điện thoại:
              </h3>
              <span className="ml-10">{res?.phone_number || ''}</span>
              <h3 className="ml-10">
                <CalendarOutlined className="mr-2" />
                Ngày sinh:
              </h3>
              <span className="ml-10">{res?.dob || ''}</span>
              <h3 className="ml-10">
                <UserOutlined className="mr-2" />
                Giới tính:
              </h3>
              <span className="ml-10">{genderLabel(res?.gender) || ''}</span>
            </div>
            <div className="w-1/3 h-full m-[20px] ">
              {' '}
              <h1 className="flex justify-center">Mô tả</h1>
              <span className="ml-10 read-only:true ">
                {' '}
                {res?.details || ''}
              </span>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  )
}
export default UserProfilePage
