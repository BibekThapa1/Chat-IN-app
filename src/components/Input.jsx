import React, { useState } from "react";
// import Button from "./Button";

const Input = React.forwardRef(function Input(
  { type = "text", placeholder = "Enter data", className = "", 
  ...props },
  ref
) {

    const [passview, setPassview] = useState(false)
    const [pass, setPass] = useState(false)

    const showPass = () =>{ 
      setPassview(!passview)
    }
 
  return (
    <div className="relative text-center">
    <input
    ref={ref}
      className={`${className} border-2 rounded-md px-2 py-1 min-h-11 min-w-80`}
      type={passview?"text":type}
      placeholder={placeholder}
      {...props}
      // onKeyUp={()=>setPass(true)}
    />

    {type==="password" && <button type="button" className="absolute text-white right-0 text-sm bg-slate-700 top-1 w-fit h-4/5 rounded-md px-3 align-middle" onClick={showPass}>{passview?"hide":"show"}</button>}
 
    </div>
  );
});

export default Input;
