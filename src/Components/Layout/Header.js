import { Dropdown, Layout, Menu } from "antd";

import { useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const HeaderComponenet = ({ toggleDrawer }) => {
  const { Header: AntHeader } = Layout;

  const navigate = useNavigate();
  const handleMenuClick = async (e) => {
    if (e.key === "1") {
      navigate("/profile");
    }
    if (e.key === "2") {
      window.location.reload();
      localStorage.clear("cmsUser");
      localStorage.clear("cms-auth");
      navigate("/login");
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Profile",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "Logout",
          key: "2",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="flex items-center justify-end h-16 px-12 py-4 mb-10 bg-slate-100 ">
      <div className=" flex justify-between gap-3">
        <p style={{ marginBottom: 0 }}>{localStorage.getItem("cmsUser")}</p>
        <Dropdown overlay={menu}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <UserOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderComponenet;
