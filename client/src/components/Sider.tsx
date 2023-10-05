import React, { useState } from "react";
import {
  GroupOutlined,
  HomeFilled,
  MoneyCollectFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

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

const { Sider } = Layout;

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100%",
      }}
    >
      <div className="logo"></div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        items={items}
        onClick={(item) => {
          navigation(item.key);
        }}
      />
    </Sider>
  );
}

export default Navbar;
