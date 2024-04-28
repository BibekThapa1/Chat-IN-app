import React, { useEffect, useState } from 'react'
import Search from '../Search'
import Friends from './Friends'
import { Link } from 'react-router-dom';
import dbService from '../../supabase/database';
import { useSelector } from 'react-redux';

const Lower = ({classname,...props}) => {

  

  return (
    <div className={`flex flex-col gap-5 ${classname}  h-full`}>
      <Search/>
      <Friends/> 
      <div>
       <Link to={"/all-friends"}><button
         className='bg-slate-400 text-xl w-full   px-2 rounded-xl align-bottom  bottom-0'
        //  onClick={}  
           

         >All friends -</button>
         </Link> 
      </div>
    </div>
  )
}

export default Lower