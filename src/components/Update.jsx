import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "./../services/fetchService";
import { useLocalState } from "./../util/useLocalStorage";

const Update = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [number, setNumber] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();
  const [token] = useLocalState("", "token");

  function cancel(event) {
    event.preventDefault();
    window.location.href = "/dashboard/users";
  }

  function handleSubmit(event) {
    event.preventDefault();
    const roles = role === "admin" ? "ROLE_ADMIN" : "ROLE_USER";
    const reqbody = {
      username: username,
      password: password,
      roles: roles,
      firstname: firstname,
      number: number,
      birthDate: birthdate,
      lastname: lastname,
    };

    fetch(`/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(reqbody),
    }).then((response) => {
      if (response.status === 200) window.location.href = "/dashboard/users";
    });
  }

  useEffect(() => {
    request(`/users/${id}`, "GET", token).then((data) => {
      setUsername(data.username);
      setFirstname(data.firstname);
      setBirthdate(data.birthDate);
      setLastname(data.lastname);
      if (data.roles === "ROLE_ADMIN") setRole("admin");
      else {
        setRole("user");
      }
    });
  }, [id, token]);

  return (
    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-6 h-screen">
        <div className="my-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Nom d'utilisateur
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="my-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Entrez le mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="my-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="firstname"
          >
            Prenom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Entrez le prénom"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </div>
        <div className="my-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="lastname"
          >
            Nom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Entrez le nom de famille"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </div>
        <div className="my-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="lastname"
          >
            Numéro
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="text"
            placeholder="Entrez le numéro de téléphone"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
        <div className="my-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="birthdate"
          >
            Date de naissance
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="date"
            placeholder="Enter birthdate"
            value={birthdate}
            onChange={(event) => setBirthdate(event.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
            Role
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 my-4 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex items-center justify-between my-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Modifier
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={cancel}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
