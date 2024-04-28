import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dbService from "../../supabase/database";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { byPrefixAndName } from "@awesome.me/kit-KIT_CODE/icons";

const Upper = () => { 
//   const element = <FontAwesomeIcon icon={byPrefixAndName.fas["house"]} />;

 const [user, setUser] = useState([])

 const {slug} = useParams();
 console.log(slug)

 useEffect(()=>{
  // async function getUserData(){
     dbService.getUserData(slug)
    .then((data)=>{
      console.log(data)
      setUser(data)
      console.log(user[0])
    })
  // }
  //  getUserData();
 },[slug])

  return user.length >=1 && (
    <div className=" flex justify-between align-middle p-3 flex-1 gap-2 bg-blue-200 rounded-xl">
      <div className="h-fit flex-2">
        <img
          src={user[0].imageUrl}
          className="h-9 object-fill rounded-full "
          alt=""
        />
      </div>
      <div className="flex justify-between align-middle gap-2 flex-1 px-3">
        <div className="w-full  flex justify-between align-middle gap-2">
        <p>{user[0].userName}</p>
        <div className="flex justify-between align-middle px-2 gap-2">
            <button className="border-none bg-black rounded-xl p-1 cursor-pointer text-white">audio</button>
            <button className="border-none bg-black rounded-xl p-1 cursor-pointer text-white">video</button>
        </div>
        </div>
        <div>
            <button className="bg-black cursor-pointer p-2 rounded-xl text-white"> option</button>
        </div>
      </div>
    </div>
  );
};

export default Upper;
