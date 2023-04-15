import React from "react";
import logo from "../assets/djezzy.png";
import HomeNav from "../components/HomeNav";

function Home() {
  function GotoLogin() {
    window.location.href = "/login";
  }

  function GotoRegister() {
    window.location.href = "/register";
  }

  return (
    <>
      <HomeNav />
      <div className="text-black w-full h-screen bg-zinc-50 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-center items-center  py-20 m-auto w-full">
          <div className="flex flex-col items-center w-full px-2 py-8">
            <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl my-4 py-4">
              BIENVENUE
            </h1>
            <p className="py-3 font-bold text-xl text-center">
              Veuillez vous connecter pour commencer
            </p>
            <div className="flex flex-row justify-center items-center w-full">
              <button
                onClick={GotoLogin}
                className="px-8 text-red-600 bg-zinc-50 border font-semibold hover:bg-red-800 hover:text-white border-red-600
                    capitalize rounded-md py-3 m-4 md:w-52 md:py-3 lg:w-64 lg:py-4"
              >
                se connecter
              </button>
              <button
                onClick={GotoRegister}
                className="px-12 text-white border font-semibold bg-red-600 border-red-600
                    hover:bg-red-800 capitalize rounded-md py-3 m-4 md:w-52 md:py-3 lg:w-64 lg:py-4"
              >
                s'inscrire
              </button>
            </div>
          </div>
          <img
            className=" w-64 flex flex-shrink md:mr-4 lg:mr-72 lg:w-1/3"
            src={logo}
            alt="djeezy logo"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
