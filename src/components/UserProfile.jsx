import React, { useState } from "react";
import { Modal, Avatar, Typography, Button } from "antd";

import user from "../data/user.jpg";
import jwt_decode from "jwt-decode";
import { useLocalState } from "../util/useLocalStorage";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useStateContext } from "../contexts/ContextProvider";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const { Title, Text } = Typography;

const UserProfile = () => {
  const [token] = useLocalState("", "token");
  const [name] = useState(getNameFromToken());

  function getNameFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.lastname + " " + decodeToken.firstname;
      }
    }
  }
  const [role] = useState(getRoleFromToken());

  function getRoleFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.authorities[0].authority;
      }
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { setisClicked } = useStateContext();

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    setisClicked({
      userProfile: !UserProfile,
    });
  };
  const handleLogoutModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  return (
    <>
      <div
        className="flex flex-row items-center pt-4 gap-2 cursor-pointer p-2 hover:bg-light-gray text-gray-800 rounded-lg"
        onClick={handleModalOpen}
      >
        {isLogoutModalOpen && (
          <LogoutConfirmModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        )}
        <Avatar size={40} src={user} />
        <Title level={5} className="mt-2">
          {name}
        </Title>
        <MdOutlineKeyboardArrowDown />
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="flex justify-between items-center">
          <Title level={3} className="mb-0">
            Profile
          </Title>
        </div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <Avatar size={64} src={user} />
          <div>
            <Title level={4} className="mb-0">
              {name}
            </Title>
            <Text type="secondary">{role.substring(5)}</Text>
          </div>
        </div>
        <button
          onClick={handleLogoutModalOpen}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          <span className="mr-2">Déconnexion</span>
          <FiLogOut />
        </button>
      </Modal>
      {<LogoutConfirmModal />}{" "}
    </>
  );
};

export default UserProfile;
