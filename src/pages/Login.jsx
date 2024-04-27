import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
import { login as authLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import authService from "../supabase/auth";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const login = async (data) => {
    const response = await authService.login(data);
    console.log(response.user);
    if (response.user) {
      dispatch(authLogin(response.user.id));
      navigate("/");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="bg-green-200 h-screen flex justify-center align-middle ">
        <div className="w-fit flex flex-col align-middle justify-center m-auto bg-slate-200 rounded-3xl p-8">
          <h3 className="flex justify-center align-middle text-center my-1 b-x border-b-2 mb-2">
            <img
              src="https://t4.ftcdn.net/jpg/05/11/87/37/360_F_511873784_NLmIMOcuwo9JTuoXJNyR0jQSQOUXUvFk.jpg"
              alt=""
              className="w-12 h-12 rounded-3xl mt-1 mb-2 mr-2 object-cover"
            />
            <span className="self-center text-xl underline">
              {" "}
              <span className="font-bold">Chat-IN{"  "}</span>Login Form
            </span>
          </h3>
          <form
            onSubmit={handleSubmit(login)}
            className="flex gap-4 flex-col justify-center align-middle"
          >
            <Input
              className="w-5/12 self-center outline-none"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              className="w-5/12 self-center outline-none"
              placeholder="Enter Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" classname="w-fit self-center text-blue-50">
              Login
            </Button>
          </form>
          <p className="text-xl self-center mt-4">
            {" "}
            Don't have an account,{" "}
            <span className="text-blue-950 underline p-2 cursor-pointer rounded-xl">
              <Link to={"/signup"}>Sign Up</Link>
            </span>
          </p>
          {error && (
            <p className="text-red-500 text-lg p-3 w-full text-center ">
              Please enter valid details
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
