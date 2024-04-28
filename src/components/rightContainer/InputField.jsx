import React, { useState } from "react";
import dbService from "../../supabase/database";
import { useSelector } from "react-redux";

const InputField = () => {

  const [image, setImage] = useState(null);
  const userId = useSelector((state)=> state.auth.userId)

  async function sendData(e){
   e.preventDefault();
   if(image){
   await dbService.uploadImages(userId,image,"sentImages")
   .then((data)=>{
    console.log(data)
   })
   }
  }


  return (
    <form className="w-ful flex justify-between p-2   bg-green-100 gap-7 h-14 pr-4" onSubmit={sendData}>
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
            <img src="https://cdn.icon-icons.com/icons2/2568/PNG/512/images_picture_icon_153719.png"
            className="object-cover h-full"
            alt="" />
          </label>
          <input type="file" id="image" name="avatar" accept="image/png, image/jpeg"  className="hidden" 
          onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="enter your message"
        className="bg-white rounded-xl p-2 px-4 outline-none w-full"
      />
      <button
      type="submit"
      className="bg-blue-200 px-3 text-xl rounded-md cursor-pointer flex-none">
      send
      </button>
    </form>
  );
};

export default InputField;
