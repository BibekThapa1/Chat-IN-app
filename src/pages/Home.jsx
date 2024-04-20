import React from 'react'
import { LeftContainer, RightContainer } from '../components'
import "../App.css";

const Home = () => {
  return (
    <div className='home flex flex-wrap m-4   rounded-xl   bg-green-200 p-2 overflow-hidden'>
        <LeftContainer/>
        <RightContainer/>
    </div>
  )
}

export default Home