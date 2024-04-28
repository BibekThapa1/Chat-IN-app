import React, { useEffect, useState } from "react";
import "../../App.css";
import { useSelector } from "react-redux";
import dbService from "../../supabase/database";
import { Link } from "react-router-dom";

const AllFriends = () => {
  const [friends, setFriends] = useState([]);
  const id = useSelector((state) => state.auth.userId);

  useEffect(() => {
    async function getAllFriends(id) {
      await dbService.getAllFriends(id)
      .then((lists)=>{
        if (lists) setFriends(lists); 
      })
    }
    getAllFriends(id);
   
  }, [id]);

  if (friends.length === 0) {
    return (
      <h4 className="p-4 text-xl">
        No friends click the search bar and add friends
      </h4>
    );
  }


  return (
    <div className="p-4 flex flex-col  gap-2">
      <h4 className="text-xl  underline">All Friends</h4>
      <ul className="flex flex-col gap-2 w-full">
        {friends.map((friend) => (
        
            <li key={friend.otherData.identities[0].id} >
                <Link to={`/user/${friend.otherData.identities[0].id}` }  className="friend-li flex justify-between rounded-xl w-full align-middle p-2 bg-slate-300 hover:bg-slate-200 cursor-pointer">
              <img src={friend.imageUrl} className="h-6 object-fill" alt="" />
              <p className="text-xl align-middle">{friend.userName} </p>
              {/* <button className="border-2 rounded-xl cursor-pointer  p-1 hover:bg-slate-100" id={friend.id} onClick={addFriends}>
              Add{" "}
            </button> */}
            </Link>
            </li>
          
        ))}
      </ul>
    </div>
  );
};

export default AllFriends;
