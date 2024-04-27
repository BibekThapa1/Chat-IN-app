import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./supabase/auth";
import {
  login as authLogin,
  logout as authLogout,
  userData,
} from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import dbService from "./supabase/database.js";

function App() {
  const [data, setData] = useState("");

  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.userId);
  const userDatas = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
    await  authService.getUser().then((data) => {
        if (data) {
          console.log(data)
          dispatch(authLogin(data.id));
        } else {
          console.log("error occured");
        }
      });
    }
    getUser();
  }, [dispatch,userStatus,navigate]);

  useEffect(() => {
    async function getUserDataFromStore(id) {
      await dbService.getUserData(id).then((data) => {
        if (data) {
          console.log(data)
          dispatch(userData(data));
        }

      });
    }
    if (userId) {
      getUserDataFromStore(userId);
    }
  }, [userStatus,navigate]);

  return (
    <div className="bg-green-100 m-0 h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
