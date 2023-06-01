import React from "react";
import DataTable from "./UserTable";

const Utilisateurs = () => {
  return (
    <div className=" p-2 md:p-10 bg-[#FAFBFB] w-full ">
    {/* // <div className=" flex-1 bg-gray-100 min-h-screen w-screen"> */}

      <div className=" mb-10">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900 mb-5">
          Liste des utilisateurs
        </p>
        <div className="border-t border-gray-700"></div>
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
};
export default Utilisateurs;
