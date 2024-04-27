import React from 'react'

const SingleFriend = ({friend}) => {
  return (
    <div className='p-1 flex align-middle justify-between h-fit gap-1 bg-blue-200 border-slate-100 border-2 rounded-xl cursor-pointer hover:bg-blue-300 duration-200	 hover:ease-in' >
      <div className="flex flex-col justify-center align-middle">
        <img src={friend.url}
        className='h-8 rounded-full object-contain'
        alt="" />
        <p className='text-center'>{friend.name}</p>
      </div>
      <p className='self-center m-auto top-2/4'>{friend.msg}</p>
    </div>
  )
}

export default SingleFriend