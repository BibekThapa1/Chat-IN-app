import React, { useState } from 'react'

const Search = () => {

    const [userName, setUserName] = useState("");
    
  return (
    <div>
        <input
         type="text" 
         value={userName}
         onChange={(e)=>setUserName(e.target.value)}
         className='outline-none w-full border-0 border-b-2 rounded-md p-2'
         placeholder='Search User'
         />
    </div>
  )
}

export default Search