import React, { useState } from "react";
import HomeNav from "../components/HomeNav";
import { FaUser } from "react-icons/fa";

function ForgotPassword() {
  const [resetFormData, setResetFormData] = useState({
    email: "",
  });

  function GotoHome() {
    window.location.href = "/";
  }

  const handleChange = (event) => {
    setResetFormData({
      ...resetFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {
      username: resetFormData.username,
    };
  };
  return (
    <div>
      <HomeNav />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col bg-white shadow-md px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md">
          <div class="font-medium self-center text-2xl uppercase text-gray-800 pt-4">
            Mot de passe oublié
          </div>
          <div className="mt-10 bg-white">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label
                  for="email"
                  className="mb-1 text-base tracking-wide text-gray-600"
                >
                  Email:
                </label>
                <div className="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="text-base bg-gray-50 placeholder-gray-500 pl-10 pr-4 text-gray-800 rounded-lg border-2 border-gray-400 w-full py-2 focus:outline-none focus:border-red-400"
                    placeholder="Email "
                    onChange={handleChange}
                    value={resetFormData.email}
                  />
                </div>
                <span class="m-2 text-sm">
                  N'oubliez pas de vérifier les spams
                </span>
              </div>

              <div class="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none border-2 border-red-600 rounded-full text-white text-base bg-red-600 hover:bg-red-700 py-2 w-full transition duration-150 ease-in"
                >
                  <span class="mr-2 capitalize">
                    Réinitialiser le mot de passe
                  </span>
                  <span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>

            <button
              onClick={GotoHome}
              type="submit"
              className="flex items-center justify-center focus:outline-none mt-4 border-2 border-red-600 rounded-full text-red-700 text-base bg-white hover:text-white hover:bg-red-700 py-2 w-full transition duration-150 ease-in"
            >
              <span className="mr-2 uppercase">Acceuil</span>
            </button>
          </div>
          ;
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
