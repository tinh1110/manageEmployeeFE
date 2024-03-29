import Sidebar from '../sidebar'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import CustomHeader from '../header'
import { CollapsedProvider } from '../../../libs/contexts/CollapsedContext'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({}: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <CollapsedProvider>
      <div id="main-layout">
        <Layout hasSider>
          <Sidebar />
          <Layout style={{ position: 'relative' }}>
            <CustomHeader colorBgContainer={colorBgContainer}></CustomHeader>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </CollapsedProvider>
  )
}

export default MainLayout
