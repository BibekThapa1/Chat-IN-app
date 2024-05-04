import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { login as authLogin } from "../store/authSlice";
import authService from "../supabase/auth";
import { useDispatch } from "react-redux";
import dbService from "../supabase/database";
import { v4 as uuidv4 } from "uuid";


const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false)


  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    const image = data.image[0];
  if(image){
    const id = await authService.signUp(data,image,"profileImages",uuidv4());

    if (id) {
      dispatch(authLogin(id));
      navigate("/");
    }
    else{
      setError(true)
    }
  }
  else setError(true)
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
              <span className="font-bold">Chat-IN</span> Sign Up Form
            </span>
          </h3>
          <form
            className="flex gap-4 flex-col justify-center align-middle"
            onSubmit={handleSubmit(create)}
          >
            <Input
              className="w-5/12 self-center outline-none"
              placeholder="Enter Your Name"
              {...register("userName", { required: true })}
            />
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
            <label
              htmlFor={id}
              className="flex bg-slate-400 h-14 px-2 w-fit rounded-md text-center cursor-pointer"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/2568/PNG/512/images_picture_icon_153719.png"
                className="object-cover h-full"
                alt=""
              />{" "}
              <p className="align-middle self-center text-xl">chose your profile picture</p>
            </label>
            <Input
              id={id}
              className={`w-5/12 self-center outline-none hidden `}
              type="image"
              
              {...register("image", {
                required: true,
              })}
            />
            <Button type="submit" classname="w-fit self-center text-blue-50">
              Sign Up
            </Button>
          </form>
          {error && <p className="text-red-500">Please enter valid details including image</p>}
          <p className="text-xl self-center mt-4">
            {" "}
            Already have an account,{" "}
            <span className="text-blue-950 underline p-2 cursor-pointer rounded-xl">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
