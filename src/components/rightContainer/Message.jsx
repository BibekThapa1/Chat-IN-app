import React from 'react'

const Message = ({props}) => {
  return (
    <div className={ `p-2 rounded flex flex-col gap-2 ${props.received?"self-start":"self-end"}`}>
     { props.img && <img className='h-32 object-contain' src={props.img} alt=''></img>}
          <p className='bg-blue-200 w-fit p-2 text-xl rounded-md relative'>{props.message}<span className='absolute -bottom-6 text-sm right-1 text-slate-500'>{props.date}</span></p>
    </div>
  )
}

export default Message