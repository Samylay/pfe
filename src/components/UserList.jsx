import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useLocalState } from "../hooks/useLocalStorage";
import DeleteUserModal from "./DeleteUserModal";

const { Column } = Table;

const dataSource = [
  {
    id: 1,
    username: "john.doe",
    firstName: "John",
    lastName: "Doe",
    birthDate: "01/01/1990",
    role: "Admin",
  },
  {
    id: 2,
    username: "jane.doe",
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "01/01/1992",
    role: "User",
  },
  {
    id: 2,
    username: "jane.doe",
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "01/01/1992",
    role: "User",
  },
  {
    id: 2,
    username: "jane.doe",
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "01/01/1992",
    role: "User",
  },
];

const UserList = () => {
  const [token] = useLocalState("", "token");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //CHANGE TO FETCH REQUESTS INSTEAD OF USERS
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
      //CHANGE IT TO DELETE REQUESTS INSTEAD OF USERS
      fetch(`/users/${id}`, {
        // GIVE REQUESTS AN ID
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }).then((response) => {
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          console.error("Failed to delete user request");
        }
      });
    },
    [token]
  );
  // tweak the methods to fit the requests backend
  const handleAccept = (record) => {
    // Send a PUT request to update the user's status to "accepted"
    fetch(`/users/${record.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({ status: "accepted" }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Update the user's status in the local state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === record.id ? { ...user, status: "accepted" } : user
            )
          );
        } else {
          console.error("Failed to update user status");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDecline = (record) => {
    // Send a PUT request to update the user's status to "declined"
    fetch(`/users/${record.id}`, {
      //<--- /requests/{id}
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({ status: "declined" }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Remove the user from the local state
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== record.id)
          );
        } else {
          console.error("Failed to update user status");
        }
      })
      .catch((error) => console.error(error));
  };

  // can add multiple selections (antd docs)
  return (
    <div className="flex-grow table-fixed">
      <Table dataSource={dataSource}>
        <Column
          title="Nom d'utilisateur"
          dataIndex="username"
          key="username"
          responsive={["xs", "sm"]}
        />
        <Column
          title="Prénom"
          dataIndex="firstName"
          key="firstName"
          responsive={["lg"]}
        />
        <Column
          title="Nom"
          dataIndex="lastName"
          key="lastName"
          responsive={["lg"]}
        />
        <Column
          title="Date de naissance"
          dataIndex="birthDate"
          key="birthDate"
          responsive={["sm"]}
        />
        <Column
          title="Rôle"
          dataIndex="role"
          key="role"
          responsive={["xs", "sm"]}
        />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div className="flex justify-around">
              <Button danger onClick={() => handleAccept(record)}>
                Accepter
              </Button>
              <Button
                danger
                type="primary"
                onClick={() =>
                  Modal.confirm({
                    title: `Êtes-vous sûr de vouloir décliner la demande de ${record.firstName} ${record.lastName} ?`,
                    icon: <AiOutlineExclamationCircle />,
                    okText: "Oui",
                    cancelText: "Non",
                    onOk: () => handleDecline(record),
                  })
                }
              >
                Décliner
              </Button>
            </div>
          )}
          responsive={["xs", "sm"]}
        />
        <DeleteUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          Delete={() => {
            // handleDeleteClick(selected);
            setIsModalOpen(false);
          }}
        />
      </Table>
    </div>
  );
};

export default UserList;
