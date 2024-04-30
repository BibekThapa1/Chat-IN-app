import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { useSelector } from "react-redux";
import dbService from "../../supabase/database";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const parentRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const ownId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    async function getAllUsers() {
      await dbService.allUser().then((lists) => {
        if (lists) setFriends(lists);
        console.log(friends)
      });
    }
    getAllUsers();
  }, [ownId]);

  async function addToFriend(e) {
    const friendId = e.target.id
    console.log(e.target.id);
    
   await dbService.addToRecent(ownId,friendId)
  }

  if (friends.length === 0) {
    return (
      <h4 className="p-4 text-xl">
        No friends. Click the search bar and add friends
      </h4>
    );
  }

  return (
    <div className="all-user p-4 flex flex-col  gap-2 overflow-y-scroll max-h -full">
      <h4 className="text-xl px-7  underline">All Users</h4>
      <ul className="flex flex-col gap-2 p-4 w-full">
        {friends.map((friend) => (
          <li ref={parentRef} key={friend.otherData.identities[0].id}>
            <Link
              id={friend.otherData.identities[0].id}
              to={`/user/${friend.otherData.identities[0].id}`}
              className="friend-li flex justify-between rounded-xl w-full align-middle p-2 bg-slate-300 hover:bg-slate-200 cursor-pointer"
              onClick={addToFriend}
            >
              <img
                src={friend.imageUrl}
                className="h-10 object-fill rounded-full "
                alt=""
              />
              <p className="text-xl align-middle pr-8 self-center">
                {friend.userName}{" "}
              </p>
              {/* <button className="border-2 rounded-xl cursor-pointer  p-1 hover:bg-slate-100" id={friend.id} >
              Add{" "}
            </button> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
