import React from "react";
import PropTypes from "prop-types";
import { TrashIcon, XIcon } from "@heroicons/react/outline";

function DeleteUserModal({ isOpen, onClose, onDelete}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete();
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-sm"></div>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <div className="flex items-center justify-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Voulez-vous vraiment supprimer cet utilisateur ?
                </h2>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={onClose}
                >
                  <XIcon className="-ml-1 mr-2 h-5 w-5" />
                  Annuler
                </button>
                <button
                  type="button"
                  className={`inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium border rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-red-500 border-red-500 hover:text-white hover:bg-red-600"
                  }`}
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  <TrashIcon className="-ml-1 mr-2 h-5 w-5" />
                  {isLoading ? "Suppression..." : "OK"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteUserModal;
