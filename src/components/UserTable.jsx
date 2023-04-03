import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "./../util/useLocalStorage";

const UserTable = () => {
  const [token, setToken] = useLocalState("", "token");

  const [users, setUsers] = useState([]);

  const [message, setmessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((userData) => {
        setUsers(userData);
      });
      console.log(users)
  }, []);

  function refreshUsers() {}

  function UpdateUser(id) {}

  const handleUpdateUser = (id) => {
    // Add code to handle updating user
  };

  const columns = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nom d'utilisateur",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Mot de passe",
      dataIndex: "password",
      key: "password",
    },

    {
      title: "Mot de passe",
      dataIndex: "password",
      key: "password",
    },

    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => UpdateUser(record.id)}>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default UserTable;
