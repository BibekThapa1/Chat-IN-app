import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authentication = ({ authentication = true, children }) => {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

console.log(authentication ,authStatus,userData)

  useEffect(() => {
    if (authentication && authStatus != authentication && !userData) {
      navigate("/login");
    }
    if (!authentication && authStatus != authentication && userData) {

      navigate("/");
    }
    setLoading(false);
  }, [authStatus, authentication, navigate, userData]);

  return loading ? (
    <h1 className="text-2xl text-center"> Loading...</h1>
  ) : (
    <>{children}</>
  );
};

export default Authentication;
