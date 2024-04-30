import React from 'react'
import { Link } from 'react-router-dom'


const SingleFriend = ({friend}) => {

  console.log(friend)

  return (
    <Link to={`user/${friend.id}`} id={friend.id} className='p-1 flex align-middle justify-between h-fit gap-1 bg-blue-200 border-slate-100 border-2 rounded-xl cursor-pointer hover:bg-blue-300 duration-200	 hover:ease-in' >
      <div className="flex flex-col justify-center align-middle">
        <img src={friend.imageUrl}
        className='h-8 rounded-full object-contain'
        alt="" />
        <p className='text-center'>{friend.userName}</p>
      </div>
      <p className='self-center m-auto top-2/4'>{friend.msg}</p>
    </Link>
  )
}

export default SingleFriend