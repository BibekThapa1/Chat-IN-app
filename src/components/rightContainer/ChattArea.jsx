import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import dbService from "../../supabase/database";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import conf from "../../conf/config";

const ChattArea = () => {
  let endOfMessagesRef = useRef(null);

  const [messages, setMessages] = useState(null);
  const ownId = useSelector((state) => state.auth.userId);
  const clicked = useSelector((state) => state.auth.clicked);

  const { slug } = useParams();
  let msgId;

  const scrollToBottom = () => {
    setTimeout(() => {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollTo({
          top: endOfMessagesRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 200);
  };

  useEffect(() => {
    msgId = ownId > slug ? ownId + slug : slug + ownId;
    dbService.getSpecificData(ownId, "messages", "messages").then((data) => {
      let rawMessages = data[0].messages;
      rawMessages = rawMessages.filter((message) => message.msgId == msgId);
      setMessages(rawMessages);
    });
    // setInterval(() => {
    //   dbService.getSpecificData(ownId, "messages", "messages").then((data) => {
    //     let rawMessages = data[0].messages;
    //     rawMessages = rawMessages.filter((message) => message.msgId == msgId);
    //     setMessages(rawMessages);
    //   });
    //   console.log("Entered");
    // }, 3000);

    scrollToBottom();
  }, [slug, clicked]);

  if (messages === null) {
    return <p>There are no messages to show.</p>;
  }

  if(slug == ownId){
    return <p>Sorry cant send message to your own id.</p>;
  }

  return (
    <div
      ref={endOfMessagesRef}
      className="chat-area overflow-hidden mt-2   pt-0  flex flex-col gap-3 p-2 overflow-y-scroll  "
    >
      {messages.map((message, index) => (
        <Message
          key={message.time}
          message={message}
          // index={index}
          // length={length}
          // ref={ref}
        />
      ))}
    </div>
  );
};

export default ChattArea;
