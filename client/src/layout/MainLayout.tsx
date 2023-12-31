import React from "react";

import { Avatar, Layout, MenuProps, theme } from "antd";
import Navbar from "../components/Sider";
import Search from "antd/es/input/Search";
import {
  GroupOutlined,
  HomeFilled,
  MoneyCollectFilled,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import MainDrawer from "../components/MainDrawer";
import { useAppSelector } from "../hooks/reduxHook";
import { selectUser } from "../context/userSlice";
const { Header, Content } = Layout;
const items: MenuProps["items"] = [
  { icon: HomeFilled, title: "Home", path: "/admin" },
  { icon: MoneyCollectFilled, title: "To'lov", path: "/admin/tolov" },
  { icon: MoneyCollectFilled, title: "Oylik", path: "/admin/oylik" },
  { icon: UserOutlined, title: "Abuturent", path: "/admin/abuturent" },
  { icon: UserOutlined, title: "O'qituvchi", path: "/admin/oqituvchi" },
  { icon: UserOutlined, title: "Admin", path: "/admin/user" },
  { icon: GroupOutlined, title: "Group", path: "/admin/group" },
  { icon: GroupOutlined, title: "Qoralama", path: "/admin/qoralama" },
].map((item) => ({
  key: item.path,
  icon: React.createElement(item.icon),
  label: item.title,
}));

const MainLayout: React.FC = () => {
  const user = useAppSelector(selectUser);
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
};

export default MainLayout;
