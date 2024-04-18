import React, { useState } from "react";
import Button from "./Button";

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
      onKeyUp={()=>setPass(true)}
    />

    {type==="password" && pass && <Button classname="absolute right-0 text-sm bg-slate-700 top-2 w-fit" onClick={showPass}>{passview?"hide":"show"}</Button>}

    </div>
  );
});

export default Input;
