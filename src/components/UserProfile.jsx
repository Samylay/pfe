import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import user from "../data/user.jpg";
import LogoutButton from "./LogoutButton";
import jwt_decode from "jwt-decode";
import { useLocalState } from "../util/useLocalStorage";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useStateContext } from "../contexts/ContextProvider";

const UserProfile = () => {
  const [token, setToken] = useLocalState("", "token");
  const [name, setName] = useState(getNameFromToken());

  function getNameFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        console.log(decodeToken);
        return decodeToken.lastname + " " + decodeToken.firstname;
      }
    }
  }
  const [role, setRole] = useState(getRoleFromToken());

  function getRoleFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.authorities[0].authority;
      }
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setisClicked, initialState } = useStateContext();

  return (
    <div>
      <LogoutConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="z-10 absolute right-1 top-16 bg-white p-8 rounded-lg w-80">
        <div className="flex justify-between items-center z-20">
          <p className="font-semibold text-lg text-gray-800">Profile</p>

          <button
            onClick={() =>
              setisClicked({
                userProfile: false,
              })
            }
            type="button"
            className={`text-2xl text-gray-800 py-2 pl-3 w-1/6 rounded-lg hover:drop-shadow-xl hover:bg-gray-100`}
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <img
            className="rounded-full h-20 w-20"
            src={user}
            alt="user-profile"
          />
          <div>
            <p className="font-semibold text-xl text-gray-800"> {name} </p>
            <p className="text-gray-800 text-sm ">{role.substring(5)}</p>
          </div>
        </div>

        <div className="mt-5">
          <LogoutButton setIsopen={() => setIsModalOpen(true)} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
