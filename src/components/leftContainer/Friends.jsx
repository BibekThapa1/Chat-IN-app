import React, { useState ,useEffect } from "react";
import SingleFriend from "./SingleFriend";
import "../../App.css";
import { useSelector } from "react-redux";
import dbService from "../../supabase/database";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  // const id = useSelector((state) => state.auth.userId);

  // useEffect(() => {
  //   async function getFriends(id) {
  //     const {friendsList} = await dbService.allFriends(id);
  //     console.log(friendsList)
  //     if (friendsList) setFriends(friendsList);
  //   }
  //   getFriends(id);
  // }, [id]);

  const ownId = useSelector((state) => state.auth.userId)

  useEffect(()=>{
    console.log(ownId)
    dbService.getRecentSection(ownId)
    .then((response)=>{
      console.log(response.data[0].recentSection);
      if(response.data[0]) setFriends(response.data[0].recentSection);
      console.log(friends)
    })
  },[ownId])
   


  if (friends.length === 0) {
    return (
      <div className="friend-list flex justify-center align-middle text-center">
        Click in search bar to search user
      </div>
    );
  }

  return (
    <div className="friend-list overflow-y-scroll flex flex-col gap-1 max-h-full ">
      {friends.map((friend) => (
        <SingleFriend friend={friend} key={friend.id} />
      ))}
    </div>
  );
};

export default Friends;
