import React from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {

  const Navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8">
      <p className="text-7xl font-extrabold text-green-700">Store</p>
      <p className="px-80 text-xl text-center">Explore our dual marketplace – fresh produce directly from farmers, and essential farming tools tailored for every agricultural need.
        Buy smart, farm smart.</p>
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <button
          onClick={() => Navigate("/farmer-user")}
          className="w-100 h-15 text-white font-bold text-3xl cursor-pointer hover:bg-green-600 transition-colors duration-300 bg-green-500 rounded-3xl flex justify-center items-center">
          Farmer to users
        </button>
        <button className="w-100 h-15 text-white font-bold text-3xl cursor-pointer hover:bg-indigo-600 transition-colors duration-300 bg-indigo-500 rounded-3xl flex justify-center items-center">
          Farmer essentials
        </button>
      </div>
    </div>
  )
}

export default Store;




