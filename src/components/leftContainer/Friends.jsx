import React, { useState ,useEffect } from "react";
import SingleFriend from "./SingleFriend";
import "../../App.css";
import { useSelector } from "react-redux";
import dbService from "../../supabase/database";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const id = useSelector((state) => state.auth.userId);

  useEffect(() => {
    async function getFriends(id) {
      const {friendsList} = await dbService.allFriends(id);
      console.log(friendsList)
      if (friendsList) setFriends(friendsList);
    }
    getFriends(id);
  }, [id]);

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
