import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocalState } from "../hooks/useLocalStorage";
import DeleteUserModal from "./DeleteUserModal";

function DataTable() {
  const [selected, setSelected] = useState(null);
  const [token] = useLocalState("", "token");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });

        if (response.status === 200) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDeleteClick = useCallback(
    (id) => {
      fetch(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }).then((response) => {
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          console.error("Failed to delete user");
        }
      });
    },
    [token]
  );

  const handleUpdateClick = useCallback((id) => {
    window.location.href = `update/${id}`;
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [users, searchQuery]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <DeleteUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => {
          handleDeleteClick(selected);
          setIsModalOpen(false);
        }}
      />
      <div className="flex items-center mx-4 my-2 mb-10">
        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-50"
        />
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-3 text-gray-500"
        >
          <g id="Interface / Search_Magnifying_Glass">
            <path
              id="Vector"
              d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      <div className="flex-grow overflow-auto">
        <table className="min-w-full divide-y divide-gray-400">
          <thead className="bg-gray-90">
            <tr>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom d'utilisateur
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Prénom
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date de naissance
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rôle
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Render rows for filtered users */}
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.id}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.firstname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.birthDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles.substring(5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleUpdateClick(user.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelected(user.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
