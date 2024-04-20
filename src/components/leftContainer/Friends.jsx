import React, { useState } from 'react'
import SingleFriend from './SingleFriend'
import "../../App.css";


const Friends = () => {

    const [friends, setFriends] = useState([])
    const friend = 
        {
            id:"76",
            name:"Bibek Thapa",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6i2LNVxPY5unOOeGmVS-pYA9ul6tyTOUrns3JXCQe8t_xSedCBfoE85sULA&s",
            msg:"hello people",
        }
    
    friends.push(friend)
    friends.push(friend)
    friends.push(friend)
    friends.push(friend)

    console.log(friends)
    
 if(friends.length === 0){
    return (
        <div className='friend-list flex justify-center align-middle'>
            Click here to search user
        </div>
    )
 }

 return (
    <div className='friend-list overflow-y-scroll flex flex-col gap-1 max-h-full '>
    {friends.map((friend)=>(
        <SingleFriend friend={friend} key={friend.id}/>
    ))}
    </div>
 )

}

export default Friends