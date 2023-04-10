import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { adminLinks, userLinks } from "../data/dummy";
import logo from "../assets/djezzy.png";
import { useStateContext } from "../contexts/ContextProvider";
import { useLocalState } from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function Sidebar() {
  const [token, setToken] = useLocalState("", "token");
  const [role, setRole] = useState(getRoleFromToken());
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [activeLink, setActiveLink] = useState("");
  let links = role === "ROLE_ADMIN" ? adminLinks : userLinks;

  function getRoleFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.authorities[0].authority;
      }
    }
  }

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    handleCloseSideBar();
  };

  return (
    <div className="w-72 fixed shadow-md bg-white h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="sidebar flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-bold tracking-tight text-slate-900"
            >
              <img
                className="h-12 w-12 mr-4 ml-2"
                src={logo}
                alt="djezzy logo"
              />
              <span>Djezzy</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(false)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
            >
              <MdOutlineCancel size={25} />
            </button>
          </div>
          <div className="mt-10">
            <Menu
              mode="inline"
              defaultSelectedKeys={[activeLink]}
              onClick={(link) => handleLinkClick(link.key)}
            >
              {links.map((item) => (
                <SubMenu
                  key={item.title}
                  icon={<AppstoreOutlined />}
                  title={item.title}
                >
                  {item.links.map((link) => (
                    <Menu.Item key={link.name} icon={<UserOutlined />}>
                      <NavLink to={`/${link.goto}`}>
                        <span className="capitalize">{link.name}</span>
                      </NavLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
