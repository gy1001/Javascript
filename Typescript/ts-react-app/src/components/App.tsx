import { Layout, Menu, ConfigProvider } from 'antd';
import React from "react"
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './App.css';
import Employee from "./employee"
const { Header, Content, Footer } = Layout;
const App = () => {
  return(
    <ConfigProvider locale={zh_CN}>
      <Layout>
        <Header>
          <Menu theme="dark" className="menu" mode="horizontal">
            <Menu.Item key="employee">员工管理</Menu.Item>
            <Menu.Item key="setting">系统设置</Menu.Item>
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <Employee></Employee>
          </div>
        </Content>
        <Footer className="footer">TypeScript in Action</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
