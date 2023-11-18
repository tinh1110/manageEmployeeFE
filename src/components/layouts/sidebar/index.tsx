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
        label: 'Users',
        children: [
          checkChildrenSidebar(USER_LIST, {
            label: 'User list',
            key: '/users/',
          }),
          checkChildrenSidebar(USER_ADD, {
            label: 'Add user',
            key: '/users/add',
          }),
          checkChildrenSidebar(USER_IMPORT_VIEW, {
            label: 'Import user',
            key: '/users/import/',
          }),
          checkChildrenSidebar(USER_LIST_DELETED, {
            label: 'User deleted',
            key: '/users/deleted',
          }),
        ],
      }),

      checkParentSidebar([], {
        key: 'roles',
        icon: <AuditOutlined />,
        label: 'Roles',
        children: [
          checkChildrenSidebar(ROLE_LIST, {
            label: 'Roles list',
            key: '/roles/',
          }),
          checkChildrenSidebar(ROLE_ADD, {
            label: 'Add role',
            key: '/roles/add',
          }),
        ],
      }),
      checkParentSidebar([], {
        key: 'teams',
        icon: <TeamOutlined />,
        label: 'Teams',
        children: [
          checkChildrenSidebar(TEAM_ADD, {
            label: 'Create New Team',
            key: '/teams/create',
          }),
          checkChildrenSidebar(TEAM_LIST, {
            label: 'Main Teams',
            key: '/teams/',
          }),
          checkChildrenSidebar(TEAM_LIST_SUB, {
            label: 'Sub Teams',
            key: '/teams/sub-teams',
          }),
        ],
      }),
      checkParentSidebar([], {
        key: 'attendances',
        icon: <CalendarOutlined />,
        label: 'Attendances',
        children: [
          checkChildrenSidebar(ATTENDANCE_LIST, {
            label: 'Attendances ',
            key: '/attendances',
          }),
          checkChildrenSidebar(ATTENDANCE_LIST, {
            label: 'Attendance list',
            key: '/attendances/list',
          }),
        ],
      }),
      checkParentSidebar([], {
        key: 'events',
        icon: <CarryOutOutlined />,
        label: 'Events',
        children: [
          checkChildrenSidebar(EVENT_LIST, {
            label: 'Events list',
            key: '/events',
          }),
          checkChildrenSidebar(EVENT_ADD, {
            label: 'Add event',
            key: '/events/add',
          }),
        ],
      }),
      checkParentSidebar(PROFILE, {
        key: '/profile',
        icon: <ProfileOutlined />,
        label: 'Profile',
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
