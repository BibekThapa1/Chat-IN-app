import React, { useState } from "react";
import dbService from "../../supabase/database";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { clicked as inputFieldClicked } from "../../store/authSlice";

const InputField = () => {
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const ownId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const { slug } = useParams();
  let sentImageUrl = "";

  function handleImageChange(e) {
    let selectedFile = e.target.files[0];
    console.log(e.target.files[0]);
    setImage(selectedFile);
    console.log(image);
  }

  async function sendData(e) {
    e.preventDefault();
    let message = msg;
    setMsg("");
    setLoading(true);
    if(image || msg){
    if (image) {
      console.log(image);
      await dbService
        .uploadImages(ownId, image, "sentImages", uuidv4())
        .then((data) => {
          sentImageUrl = `https://ourvhgbvgfgyitosfspy.supabase.co/storage/v1/object/public/${data.data.fullPath}`;
        });
    }
    let msgId = ownId > slug ? ownId + slug : slug + ownId;
    let time = new Date();
    await dbService.updateMessage(
      ownId,
      slug,
      message,
      msgId,
      time,
      sentImageUrl
    );
  }
    setImage(null);
    sentImageUrl = "";
    message = "";
    setLoading(false);
    dispatch(inputFieldClicked());
  }

  return (
    <form
      className="w-ful flex justify-between p-2   bg-green-100 gap-7 h-14 pr-4"
      onSubmit={sendData}
    >
      <div className="flex flex-none gap-2 w-2/12 ">
        <div>
          {/* <label
            htmlFor="add"
            className="text-2xl font-bold bg-slate-400 p-1 rounded-md text-center self-center cursor-pointer m-auto"
          >
            +
          </label>
          <input id="add" type="file" className="hidden" ></input> */}
        </div>
        <div>
          <label
            htmlFor="image"
            className=" bg-slate-400 rounded-md text-center cursor-pointer"
          >
            <img
              src="https://cdn.icon-icons.com/icons2/2568/PNG/512/images_picture_icon_153719.png"
              className="object-cover h-full"
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            name="avatar"
            accept="image/png, image/jpeg"
            className="hidden"
            disabled={loading}
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="enter your message"
        className="bg-white rounded-xl p-2 px-4 outline-none w-full"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-200  w-32 px-3 text-xl rounded-md cursor-pointer flex-none"
        disabled={loading}
      >
        {loading ? "sending.." : "send"}
      </button>
    </form>
  );
};

export default InputField;
