import React, { useState } from "react";
import { debounce, filter } from "lodash";
import "../App.css";
import dbService from "../supabase/database";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState(null);
  const ownId = useSelector((state) => state.auth.userId);

  const ownData = useSelector((state) => state.auth.data);

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlBWrqkcAQADicgAlj-cH4f3sRrIzHcee7w&s";

  const fetchUsers = debounce(async (prefix) => {
    const data = await dbService.searchUsers(prefix);
    if (data) {
      setUsers(filterItems(data));
    }
  }, 300);
  // console.log(ownData[0].otherData.identities[0].id);

  async function addFriend(e) {
    const friendId = e.target.id;
    console.log(friendId)
    setUserName("");

    await dbService.addToRecent(ownId, friendId);

  }
  function filterItems(arr) {
    return arr.filter((a) => a.id != ownId);
  }

  function search() {
    if (userName.length > 0) {
      fetchUsers(userName);
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="outline-none w-full border-0 border-b-2 rounded-md p-2"
        placeholder="Search User"
        onKeyUp={search}
      />
      {users && userName.length >= 1 && (
        <div className="absolute bg-slate-200 p-1 h-fit max-h-96  flex-col gap-4  overflow-y-scroll  w-full">
          {users.map((user) => (
            <Link
              to={`user/${user.id}`}
              key={user.id}
              className="searched-user p-1 rounded-xl flex align-middle justify-between bg-white cursor-pointer mb-2 hover:bg-slate-300"
              onClick={addFriend}
              id={user.id}
            >
              <img
                src={user.imageUrl || defaultImage}
                alt=""
                className="h-9 rounded-full self-center"
              />
              <p className="text-center self-center">{user.userName}</p>
              <button
                className="border-2 p-2 rounded-xl hover:bg-slate-100"
                id={user.id}
              >
                +
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
