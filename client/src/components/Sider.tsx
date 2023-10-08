import React, { useState } from "react";
import {
  GroupOutlined,
  HomeFilled,
  MoneyCollectFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

function Navbar({ items }: { items: any }) {
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
