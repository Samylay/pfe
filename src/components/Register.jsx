import React, { useEffect, useState } from "react";
import logo from "../assets/djezzy.png";
import { useLocalState } from "../util/useLocalStorage";

function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    passwordConfirmation: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  const [token, setToken] = useLocalState("", "token");

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const roles = role === "admin" ? "ROLE_ADMIN" : "ROLE_USER";

      const reqBody = {
        username: registerFormData.username,
        password: registerFormData.password,
        email: registerFormData.email,
        roles: roles,
        firstname: registerFormData.firstName,
        number: registerFormData.phoneNumber,
        birthDate: registerFormData.dateOfBirth,
        lastname: registerFormData.lastName,
      };
      fetch("/users/adduser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        method: "POST",
        body: JSON.stringify(reqBody),
      }).then((response) => {
        if (response.status === 200) window.location.href = "users";
      });
    }
  }, [
    formErrors,
    isSubmit,
    registerFormData.dateOfBirth,
    registerFormData.email,
    registerFormData.firstName,
    registerFormData.lastName,
    registerFormData.password,
    registerFormData.phoneNumber,
    registerFormData.username,
    role,
    token,
  ]);

  const validate = () => {
    const errors = {};
    if (!registerFormData.username) {
      errors.username = "Le nom d'utilisateur est requis.";
    }

    if (registerFormData.username && registerFormData.username.length < 4) {
      errors.username =
        "Le nom d'utilisateur doit contenir au moins  4 caractères.";
    }

    if (!registerFormData.firstName) {
      errors.firstname = "Le Prénom est requis.";
    }

    if (registerFormData.firstName && registerFormData.firstName.length < 3) {
      errors.firstname = "Le prénom doit contenir au moins  3 caractères.";
    }

    if (!registerFormData.lastName) {
      errors.lastname = "Le nom est requis.";
    }

    if (registerFormData.lastName && registerFormData.lastName.length < 3) {
      errors.lastname = "Le nom doit contenir au moins  3 caractères.";
    }

    if (registerFormData.phoneNumber) {
      const cleanNumber = registerFormData.phoneNumber.replace(/\D/g, "");

      if (!/^(\+213|00213|0)(5|6|7)[0-9]{8}$/.test(cleanNumber)) {
        errors.phoneNumber = "Le numéro de téléphone n'est pas valide.";
      }
    } else {
      errors.phoneNumber = "Le numéro de téléphone est requis.";
    }

    if (!registerFormData.password) {
      errors.password = "Le mot de passe est requis.";
    }

    if (registerFormData.password && registerFormData.password.length < 4) {
      errors.password = " Le mot de passe doit contenir au moins 4 caractères.";
    }

    if (registerFormData.password !== registerFormData.passwordConfirmation) {
      errors.confirmation = " Les mots de passe ne correspondent pas.";
    }

    if (!registerFormData.email) {
      errors.email = "L'adresse e-mail est requise.";
    }

    if (
      registerFormData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerFormData.email)
    ) {
      errors.email = "L'adresse e-mail n'est pas valide.";
    }

    return errors;
  };

  return (
    <div>
      <div className="bg-[#FAFBFB] min-h-screen  max-w-screen lg:max-w-7xl">
        <div className="p-4 mx-auto max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img
              className=" object-scale-down h-20 w-20"
              src={logo}
              alt="djeezy logo"
            />
            <div class="font-medium p-4 self-center text-center text-2xl uppercase text-gray-800">
              Créer un compte
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="userName"
              >
                Nom d'utilisateur
              </label>
              <input
                className={
                  !formErrors.username
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="text"
                name="username"
                id="userName"
                placeholder="Nom d'utilisateur"
                value={registerFormData.userName}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.username}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="firstName"
              >
                Prénom
              </label>
              <input
                className={
                  !formErrors.firstname
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Prénom"
                value={registerFormData.firstName}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.firstname}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="lastName"
              >
                Nom
              </label>
              <input
                className={
                  !formErrors.lastname
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nom"
                value={registerFormData.lastName}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.lastname}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="phoneNumber"
              >
                Numéro de téléphone
              </label>
              <input
                className={
                  !formErrors.number
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="XX XX XX XX XX"
                value={registerFormData.phoneNumber}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.number}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="dateOfBirth"
              >
                Année de naissance
              </label>
              <input
                className="bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400"
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={registerFormData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="password"
              >
                E-mail
              </label>
              <input
                className={
                  !formErrors.email
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="email"
                name="email"
                id="email"
                placeholder="Entrez l'adresse e-mail"
                value={registerFormData.email}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.email}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                className={
                  !formErrors.password
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="password"
                name="password"
                id="password"
                placeholder="Entrez le mot de passe"
                value={registerFormData.password}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.password}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block font-bold mb-2 text-gray-700"
                htmlFor="passwordConfirmation"
              >
                Confirmez le mot de passe
              </label>
              <input
                className={
                  !formErrors.confirmation
                    ? "bg-gray-100 text-gray-800 border border-gray-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                    : "bg-gray-100 text-gray-800 border border-red-400 p-2 w-full text-base placeholder-gray-500 pr-4 rounded-lg py-2 focus:outline-none focus:border-red-400 "
                }
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="Confirmez le mot de passe"
                value={registerFormData.passwordConfirmation}
                onChange={handleChange}
              />
              <p className="text-red-600 ml-3 text-[14px]">
                {formErrors.confirmation}
              </p>
            </div>{" "}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              className="flex items-center justify-center focus:outline-none border-4 border-red-600 rounded-full text-white text-base bg-red-600 hover:bg-red-700 py-2 w-full transition duration-150 ease-in"
              type="submit"
            >
              Créer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
