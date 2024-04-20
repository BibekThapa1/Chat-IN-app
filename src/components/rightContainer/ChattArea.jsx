import React, { useState } from 'react'
import Message from './Message';

const ChattArea = () => {

    const [messages, setMessages] = useState([]);

    const message = {
        message:"Hello there",
        date:4634,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv0isfrRhUum4UK-p7wgpTi9QKy-8jFpTkOg&s",
        received:false,

    }

    messages.push(message)

    if(messages.length === 0){
        return (
            <p>
            There are no messages to show.
            </p>
        )
    }

  return (
    <div className='chat-area overflow-hidden mt-2   pt-0  flex flex-col gap-3 p-2 overflow-y-scroll  '>
        {
            messages.map((message)=>(
                <Message key={message.date} props={message}/>
            ))
        }
    </div>
  )
}

export default ChattArea