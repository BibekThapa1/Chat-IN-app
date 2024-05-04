import React from 'react'

const Message = ({message}) => {
  return (

    <div className={ `p-2 flex flex-col justify-start align-baseline  rounded   gap-2 ${message.received?"self-start":"self-end"}`}>
     { message.imageUrl && <img className='h-32 object-contain' src={message.imageUrl} alt=''></img>}
          <p className='bg-blue-200 h-fit  w-fit p-2 text-xl rounded-md relative self-end'>{message.msg}</p>
          <p className=' text-sm right-1 text-slate-500 self-end'>{message.time}</p>
    </div>
  )
}

export default Message