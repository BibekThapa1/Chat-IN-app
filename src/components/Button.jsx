import React from "react";

const Button = ({ 
  classname,
  type="button",
   children,
    ...props }) => {
  return (
    <button
      className={`bg-blue-300 px-2 py-1 text-xl rounded-md cursor-pointer text-white ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
