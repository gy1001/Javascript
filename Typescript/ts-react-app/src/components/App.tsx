import { Layout, Menu, ConfigProvider } from 'antd';
import { Route, Link } from "react-router-dom"
import React from "react"
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './App.css';
import Employee from "./employee"
import Setting from "./setting"
const { Header, Content, Footer } = Layout;
const App = ({ match }:any) => {
  let defaultKey = match.url.replace('/',"") || "employee"
  return(
    <ConfigProvider locale={zh_CN}>
      <Layout>
        <Header>
          <Menu theme="dark" className="menu" mode="horizontal" defaultSelectedKeys={[defaultKey]}>
            <Menu.Item key="employee"><Link to="/employee">员工管理</Link></Menu.Item>
            <Menu.Item key="setting"><Link to="/setting">系统设置</Link></Menu.Item>
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <Route path="/" exact component={Employee}></Route>
            <Route path="/employee" component={Employee}></Route>
            <Route path="/setting" component={Setting}></Route>
          </div>
        </Content>
        <Footer className="footer">TypeScript in Action</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
