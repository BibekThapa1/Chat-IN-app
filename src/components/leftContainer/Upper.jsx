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
  const [option, setOption] = useState(false);
  const optionsToggle = () => {
    setOption(!option);
  };

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
              className="rounded-full h-10 object-fill"
              alt=""
            />
            <p className="text-center">{userData[0].userName || ""}</p>
          </div>
          <div className="relative">
            <button
              className="bg-red-700 h-fit p-1 self-center	rounded-xl w-16 text-center text-white"
              onClick={optionsToggle}
            >
              {option ? "Close" : " Option"}
            </button>
            <ol
              className={`${
                option ? "block" : "hidden"
              } absolute z-10  bg-slate-400 -bottom-16 py-2 px-2 rounded-md flex flex-col gap-2`}
            >
              <li>
                <button className="p-1 bg-slate-300 px-3 rounded w-full hover:bg-slate-200" onClick={logout}>
                  logout
                </button>
              </li>
              <li>
                <button className="p-1 bg-slate-300 px-3 rounded hover:bg-slate-200">
                  settings
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  );
};

export default Upper;
