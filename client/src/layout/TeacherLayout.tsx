import { Avatar, Layout } from "antd";
import MainDrawer from "../components/MainDrawer";
import Navbar from "../components/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import { GroupOutlined, UserAddOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
import { MenuProps, theme } from "antd";
import React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { selectUser } from "../context/userSlice";

const items: MenuProps["items"] = [
  { icon: HomeFilled, title: "Home", path: "/teacher" },
  { icon: GroupOutlined, title: "Group", path: "/teacher/group" },
].map((item) => ({
  key: item.path,
  icon: React.createElement(item.icon),
  label: item.title,
}));

function TeacherLayout() {
  const user = useAppSelector(selectUser);
  console.log(user);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="mainLayout">
      <MainDrawer></MainDrawer>
      <Navbar items={items} />
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
            {user && (
              <h1>
                {(user.last_name as any).charAt() + "." + user.first_name}
              </h1>
            )}
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
}

export default TeacherLayout;
