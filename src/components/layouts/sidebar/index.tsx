import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  UserOutlined,
  ProfileOutlined,
  TeamOutlined,
  CalendarOutlined,
  AuditOutlined,
  CarryOutOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import SideBarLogo from './SideBarLogo'
import { useCollapsedProvider } from '../../../libs/contexts/CollapsedContext'
import {
  checkChildrenSidebar,
  checkParentSidebar,
  getPermissions,
} from '../../../libs/helpers/getLocalStorage'
import {
  ATTENDANCE_IMPORT,
  ATTENDANCE_LIST,
  EVENT_ADD,
  EVENT_LIST,
  PROFILE,
  ROLE_ADD,
  ROLE_LIST,
  TEAM_ADD,
  TEAM_LIST,
  TEAM_LIST_SUB,
  USER_ADD,
  USER_IMPORT_VIEW,
  USER_LIST,
  USER_LIST_DELETED,
} from '../../../libs/constants/Permissions'

const { Sider } = Layout

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState('/')
  const [selected, setSelected] = useState<string[]>([])
  const context = useCollapsedProvider()
  useEffect(() => {
    const pathName = location.pathname
    if (pathName) {
      setSelectedKeys(pathName)
      if (selected[0] !== pathName.split('/')[1])
        setSelected([pathName.split('/')[1]])
    }
  }, [location.pathname])

  const permissionsInfor = getPermissions()

  const item = useMemo(() => {
    return [
      checkParentSidebar([], {
        key: 'users',
        icon: <UserOutlined />,
        label: 'Người dùng',
        children: [
          checkChildrenSidebar(USER_LIST, {
            label: 'Danh sách',
            key: '/users/',
          }),
          checkChildrenSidebar(USER_ADD, {
            label: 'Thêm nhân viên',
            key: '/users/add',
          }),
          checkChildrenSidebar(USER_IMPORT_VIEW, {
            label: 'Import file',
            key: '/users/import/',
          }),
          checkChildrenSidebar(USER_LIST_DELETED, {
            label: 'Người dùng đã xóa',
            key: '/users/deleted',
          }),
        ],
      }),

      checkParentSidebar([], {
        key: 'roles',
        icon: <AuditOutlined />,
        label: 'Chức vụ',
        children: [
          checkChildrenSidebar(ROLE_LIST, {
            label: 'Danh sách',
            key: '/roles/',
          }),
          checkChildrenSidebar(ROLE_ADD, {
            label: 'Thêm chức vụ',
            key: '/roles/add',
          }),
        ],
      }),
      checkParentSidebar([], {
        key: 'teams',
        icon: <TeamOutlined />,
        label: 'Dự án',
        children: [
          checkChildrenSidebar(TEAM_ADD, {
            label: 'Thêm dự án',
            key: '/projects/create',
          }),
          checkChildrenSidebar(TEAM_LIST, {
            label: 'Danh sách dự án',
            key: '/projects/',
          }),
        ],
      }),
      checkParentSidebar([], {
        key: 'attendances',
        icon: <CalendarOutlined />,
        label: 'Xin nghỉ',
        children: [
          checkChildrenSidebar(ATTENDANCE_LIST, {
            label: 'Tạo đơn xin nghỉ ',
            key: '/attendances',
          }),
          checkChildrenSidebar(ATTENDANCE_LIST, {
            label: 'Danh sách đơn nghỉ',
            key: '/attendances/list',
          }),
        ],
      }),
      checkParentSidebar([], {
        key: 'events',
        icon: <CarryOutOutlined />,
        label: 'Sự kiện',
        children: [
          checkChildrenSidebar(EVENT_LIST, {
            label: 'Danh sách sự kiện',
            key: '/events',
          }),
          checkChildrenSidebar(EVENT_ADD, {
            label: 'Thêm sự kiện',
            key: '/events/add',
          }),
        ],
      }),
      checkParentSidebar(PROFILE, {
        key: '/profile',
        icon: <ProfileOutlined />,
        label: 'Trang cá nhân',
        children: null,
      }),
    ]
  }, [permissionsInfor])
  return (
    <>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={context.collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <SideBarLogo />
        <Menu
          mode="inline"
          selectedKeys={[selectedKeys]}
          openKeys={selected}
          defaultOpenKeys={selected}
          onClick={({ key }) => {
            navigate(key)
          }}
          onOpenChange={(keys) => {
            setSelected([keys[1]])
          }}
          items={item}
        />
      </Sider>
    </>
  )
}

export default Sidebar
