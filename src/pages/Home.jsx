import React, { useEffect, useState } from "react";
import { LeftContainer, RightContainer } from "../components";
import "../App.css";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


const Home = () => {

const [loading, setLoading] = useState(true);
const data = useSelector((state => state.auth.data));
const navigate = useNavigate();

console.log(data)
useEffect(()=>{
  if(data) setLoading(false);
  
},[data,loading,navigate]);
console.log("entered the loading",loading)

  return loading ? (
    <h1 className="flex justify-center align-middle w-screen h-screen text-2xl">Loading...</h1>
  ) : (
    <div id="home" className="home flex flex-wrap m-4   rounded-xl   bg-green-200 p-2">
      <LeftContainer />
      <RightContainer />
    </div>
  );
};

export default Home;
