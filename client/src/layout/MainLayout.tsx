import React from "react";

import { Avatar, Layout, theme } from "antd";
import Navbar from "../components/Sider";
import Search from "antd/es/input/Search";
import { UserAddOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import MainDrawer from "../components/MainDrawer";
const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="mainLayout">
      <MainDrawer></MainDrawer>
      <Navbar />
      <Layout style={{ height: "100%" }}>
        <Header style={{ background: colorBgContainer }} className="header">
          <div className="search">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="middle"
            />
          </div>
          <div className="avatar">
            <Avatar size={44} icon={<UserAddOutlined />} />
            <h1>Son</h1>
          </div>
        </Header>
        <Content
          style={{ margin: "24px 16px 0", overflow: "initial", height: "100%" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
