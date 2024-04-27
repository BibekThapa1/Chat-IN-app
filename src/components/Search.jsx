import React, { useState } from "react";
import { debounce } from "lodash";
import "../App.css";
import dbService from "../supabase/database";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState(null);

  const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlBWrqkcAQADicgAlj-cH4f3sRrIzHcee7w&s";

  const fetchUsers = debounce(async (prefix) => {
    const data = await dbService.searchUsers(prefix);
   if(data){
    setUsers(data)
   }
  }, 300);


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
        onChange={e => setUserName(e.target.value)}
        className="outline-none w-full border-0 border-b-2 rounded-md p-2"
        placeholder="Search User"
        onKeyUp={search}
      />
      {users && userName.length >= 1 && (
        <ul className="absolute bg-slate-200 p-1 h-fit max-h-96  flex-col gap-4  overflow-y-scroll  w-full">
          {users.map((user) => (
            <li key={user.id} className="searched-user p-1 rounded-xl flex align-middle justify-between bg-white cursor-pointer mb-2 hover:bg-slate-300">
              <img
                src={user.imageUrl || defaultImage}
                alt=""
                className="h-9 rounded-full self-center"
              />
              <p className="text-center self-center">{user.userName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
