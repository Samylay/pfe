import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Tooltip } from "antd";
import UserProfile from "./UserProfile";

import { useStateContext } from "../contexts/ContextProvider";
import { useLocalState } from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";

function NavBar() {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setisClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  const [token, setToken] = useLocalState("", "token");
  const [name, setName] = useState(getNameFromToken());

  function getNameFromToken() {
    if (token && token.length > 50) {
      const decodeToken = jwt_decode(token);
      return decodeToken.firstname;
    }
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(screenSize > 900);
  }, [screenSize]);

  return (
    <div className="flex justify-between items-center py-2 px-6 sticky w-full h-20">
      <Tooltip title="Menu" placement="bottom">
        <button
          className="relative text-xl rounded-full p-3 hover:bg-light-gray"
          type="button"
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          style={{ color: "red" }}
        >
          <AiOutlineMenu size={25} />
        </button>
      </Tooltip>

      <div
        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
        onClick={() =>
          setisClicked({
            userProfile: true,
          })
        }
      >
        <UserProfile />
      </div>
    </div>
  );
}

export default NavBar;
