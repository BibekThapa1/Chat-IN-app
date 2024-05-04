import React from 'react'
import Lower from './Lower'
import Upper from './Upper'

const LeftContainer = () => {
  return (
    <>
    <div id='left-container' className=" bg-green-300 rounded-xl flex flex-col gap-8 w-2/12 p-3">
        <Upper className="flex-1"/>
        <Lower className="flex-3"/>
    </div>
    </>
  )
}

export default LeftContainer