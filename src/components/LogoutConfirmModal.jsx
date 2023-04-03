import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { FiLogOut } from "react-icons/fi";
import { useLocalState } from "../util/useLocalStorage";

function LogoutConfirmModal({ isOpen, onClose }) {
  const [token, setToken] = useLocalState("", "token");

  function Logout() {
    setToken(null);
    window.location.href = "/login";
  }
  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-sm" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-medium text-gray-900">
              Voulez vous vraiment vous déconnecter ?
            </h2>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-md hover:text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={Logout}
            >
              <FiLogOut className="-ml-1 mr-2 h-5 w-5" />
              Confirmer
            </button>

            <button
              type="button"
              className="inline-flex ml-3 justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={onClose}
            >
              <XIcon className="-ml-1 mr-2 h-5 w-5" />
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
