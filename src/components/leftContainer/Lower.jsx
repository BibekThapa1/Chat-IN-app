import React from 'react'
import Search from '../Search'
import Friends from './Friends'

const Lower = ({classname,...props}) => {
  return (
    <div className={`flex flex-col gap-5 ${classname}  h-full`}>
      <Search/>
      <Friends/> 
      <div>
        <button
         className='bg-slate-400 text-xl w-full   px-2 rounded-xl align-bottom  bottom-0'
        //  onClick={}  
           

         >All friends -</button>
      </div>
    </div>
  )
}

export default Lower