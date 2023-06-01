import React from "react";
import { Modal } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useLocalState } from "../hooks/useLocalStorage";
import { XIcon } from "@heroicons/react/solid";

function LogoutConfirmModal({ isOpen, onClose }) {
  const [token, setToken] = useLocalState("", "token");

  function Logout() {
    setToken(null);
    window.location.href = "/login";
  }

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <div className="flex items-center justify-center p-8 m-4">
        <h2 className="text-lg font-medium text-gray-900">
          Voulez vous vraiment vous déconnecter ?
        </h2>
      </div>
      <div className="flex justify-around px-6">
        <button
          type="button"
          className="inline-flex ml-3 justify-center px-6 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          onClick={onClose}
        >
          <XIcon className="-ml-1 mr-2 h-5 w-5" />
          Annuler
        </button>{" "}
        <button
          key="confirm"
          type="button"
          className="inline-flex justify-center px-6 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-md hover:text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          onClick={Logout}
        >
          <FiLogOut className="-ml-1 mr-2 h-5 w-5" />
          Confirmer
        </button>
      </div>
    </Modal>
  );
}

export default LogoutConfirmModal;
