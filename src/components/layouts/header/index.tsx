import { Link } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, Avatar, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { getUser } from '../../../libs/helpers/getLocalStorage'
import { logout } from '../../../services/authentication'
import { useCollapsedProvider } from '../../../libs/contexts/CollapsedContext'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import userdefault from '../../../assets/user.png'

const { Header } = Layout
interface Props {
  colorBgContainer?: string
}

const handleLogout = async () => {
  try {
    await logout() // Chờ hàm logout() hoàn thành
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user_info')
    localStorage.removeItem('permissions')
    window.location.href = '/login'
  } catch (err) {
    // Xử lý lỗi nếu cần
  }
}
const items: MenuProps['items'] = [
  {
    label: (
      <Link to="/profile">
        <Button type="text" className=" bg-white-500">
          <UserOutlined />
          Trang cá nhân
        </Button>
      </Link>
    ),
    key: 'profile',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Button type="text" onClick={handleLogout} className=" bg-white-500">
        <LogoutOutlined />
        Đăng xuất
      </Button>
    ),
    key: 'logout',
  },
  {
    type: 'divider',
  },
]

const CustomHeader = ({ colorBgContainer }: Props) => {
  let user = getUser()
  const context = useCollapsedProvider()

  // Truy cập các thuộc tính của userInfo
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <Button
          type="text"
          icon={
            context.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
          onClick={() => context.setCollapsed(!context.collapsed)}
          className="text-base w-16 h-16"
        />
        <Dropdown className="mr-5" menu={{ items }} trigger={['click']}>
          <a
            onClick={(e: any) => e.preventDefault()}
            style={{ float: 'right', paddingRight: '16px' }}
          >
            <Space>
              <Avatar
                src={user?.avatar || userdefault}
                className="h-8 ml-6 mb-6 mt-4"
              />
              {user?.name || 'user name'}
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  )
}

export default CustomHeader
