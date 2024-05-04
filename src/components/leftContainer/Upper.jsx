import React, { useDebugValue, useEffect, useState } from "react";
import Button from "../Button";
import { useSelector ,useDispatch} from "react-redux";
import authService from "../../supabase/auth";
import {logout as authLogout} from "../../store/authSlice"
import { useNavigate } from "react-router-dom";
import dbService from "../../supabase/database";


const Upper = ({ classname, ...props }) => {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlBWrqkcAQADicgAlj-cH4f3sRrIzHcee7w&s";

  const userData = useSelector((state) => state.auth.data);
  const dispatch  = useDispatch();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) setLoading(false);
  }, [userData]);

  //  Option Button
  // const [option, setOption] = useState(false);
  // const optionsToggle = () => {
  //   setOption(!option);
  // };

  // Logout Button
  const logout = async ()=>{
   await authService.logout();
   dispatch(authLogout());
   navigate("/login")
  }


  return (
    !loading && (
      <div>
        <div className={`flex justify-between align-middle gap-2 ${classname}`}>
          <div className="flex flex-col justify-center  align-middle">
            <img
              src={userData[0].imageUrl || defaultImage}
              className="rounded-full h-10 object-contain"
              alt=""
            />
            <p className="text-center">{userData[0].userName || ""}</p>
          </div>
          <div className="relative">
          <button className="p-1 bg-red-500 px-3 rounded-xl cursor-pointer text-xl align-middle w-full hover:bg-slate-600 hover:text-white" onClick={logout}>
                  logout
                </button>
           
          </div>
        </div>
      </div>
    )
  );
};

export default Upper;
