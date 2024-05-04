import React, { useState, useEffect } from "react";
import SingleUser from "./SingleUser";
import "../../App.css";
import { useSelector } from "react-redux";
import dbService from "../../supabase/database";

const Friends = () => {
  const [friends, setFriends] = useState();

  // const id = useSelector((state) => state.auth.userId);

  // useEffect(() => {
  //   async function getFriends(id) {
  //     const {friendsList} = await dbService.allFriends(id);
  //     console.log(friendsList)
  //     if (friendsList) setFriends(friendsList);
  //   }
  //   getFriends(id);
  // }, [id]);

  const ownId = useSelector((state) => state.auth.userId);
  const clicked = useSelector((state) => state.auth.clicked);

  useEffect(() => {
    console.log(ownId);
    async function getData() {
      await dbService.getRecentSection(ownId).then((response) => {
        console.log(response.data[0].recentSection);
        let data = response.data[0].recentSection;
        if (data) {
          setFriends(data);
        }
      });
    }
    getData();
  }, [ownId,clicked]);



  if (friends == null) {
    return (
      <div className="friend-list flex justify-center align-middle text-center">
        Click in search bar to search user
      </div>
    );
  }

  return (
    <div id="friend-list" className=" flex flex-col overflow-x-scroll gap-1 max-h-full ">
      {friends.map((friend) => (
        <SingleUser friend={friend} key={friend.id}  className="friend"/>
      ))}
    </div>
  );
};

export default Friends;
