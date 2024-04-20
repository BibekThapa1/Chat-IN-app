import React from 'react'
import Upper from './Upper'
import Lower from './Lower'

const RightContainer = () => {
  return (
    <div
    className='flex flex-col flex-1 h-full  '
    >
        <Upper className="flex-1"/>
        <Lower className='flex-4'/>
    </div>
  )
}

export default RightContainer