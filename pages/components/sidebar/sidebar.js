import React, { useState } from "react";
import useAuthStore from "../../store/auth.store";
import Swal from "sweetalert2";
import {
  DashboardOutlined,
  DollarCircleOutlined,
  UserOutlined,
  SettingOutlined,
  FileSearchOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon = null, children = null) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  // getItem("Home", "/home", <HomeOutlined />),
  getItem("Users", "1", <UserOutlined />, [
    getItem("All Clients List", "/users"),
    getItem("Verify and VIP status Management", "/user-management"),
    getItem("Admin Users", "/404"),
    getItem("Suppliers", "/sellers"),
  ]),
  getItem("Products", "2", <ShoppingCartOutlined />, [
    getItem("Suppliers", "/sellers"),
    getItem("Products", "/products"),
  ]),
  getItem("Quotations", "3", <FileSearchOutlined />, [
    getItem("All Quotations", "/rfq"),
    getItem("Quotation Management", "/quotation-management"),
    getItem("Declined Quotation", "/declined-management"),
  ]),
  getItem("Payment", "/payment-management", <DollarCircleOutlined />),

  getItem("Reports", "4", <CopyOutlined />, [
    getItem("Invoice List", "/invoice"),
    getItem("Transaction History", "/quotation-management"),
    getItem("Monthly Sales Report", "/declined-management"),
  ]),

  getItem("CMS", "5", <EditOutlined />, [
    getItem("Blogs", "/profile"),
    getItem("Password", "/password"),
  ]),

  getItem("Settings", "6", <SettingOutlined />, [
    getItem("Profile", "/profile"),
    getItem("Password", "/password"),
  ]),

  getItem("Logout", "/logout", <LogoutOutlined />),
];

export const Sidebar = () => {
  const [activeKey, setActiveKey] = useState([""]);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your session will be closed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setLoggedOut();
      }
    });
  };

  const menuChanged = (value) => {
    if (value.key === "/logout") {
      handleLogout();
    } else {
      navigate(`${value.key}`);
      setActiveKey([value.key]);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filterMenuItems = (menuItems, searchValue) => {
    return menuItems.filter((item) => {
      const filteredItem = {
        //gett also the childs
        ...item,
        children: item.children
          ? filterMenuItems(item.children, searchValue)
          : null,
      };
      return (
        filteredItem.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        (filteredItem.children && filteredItem.children.length > 0)
      );
    });
  };

  const filteredItems = filterMenuItems(items, searchValue);

  return (
    <Sider
      // style={{ background: colorBgContainer }}
      width={300}
      theme="light"
      collapsible
      onCollapse={(cola) => {
        setIsCollapsed(cola);
      }}
      // style={{
      //   height: "100vh",
      // }}
    >
      <img
        src="/sider.svg"
        width={isCollapsed ? 50 : 150}
        style={{
          margin: 15,
        }}
        alt=""
      />

      <Search
        placeholder="Search Menu"
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        selectedKeys={activeKey}
        items={filteredItems}
        onClick={menuChanged}
      />
    </Sider>
  );
};
