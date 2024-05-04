import React from "react";
import Upper from "./Upper";
import Lower from "./Lower";
import { useParams } from "react-router-dom";
import AllUsers from "./AllUsers";

const RightContainer = () => {
  const {slug} = useParams();
  console.log(slug)

  if (slug == "all-users") {
    return <AllUsers />;
  }

  else if(slug != undefined){
   return (
      <div id="right-container" className="flex flex-col">
        <Upper className="flex-1" />
        <Lower className="flex-4" />
      </div>
    );
  }
  else   return <h1 className=" text-center text-xl pl-4 flex justify-between align-middle self-center">Welcome to the Chat-In App</h1>
    
};

export default RightContainer;
