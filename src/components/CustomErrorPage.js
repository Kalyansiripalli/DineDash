import React from "react";
import { errorImage } from "../utils/constants";
import { useRouteError } from "react-router-dom";

const CustomErrorPage = () => {
  const err = useRouteError();
  return (
    <>
      <div className="errorPage">
        <img  className="errorImage" src={errorImage} alt="errorImage" />
        <h1>{err.status}:{err.statusText}</h1>
        <h4>{err.data}</h4>
      </div>
      
    </>
  );
};

export default CustomErrorPage;
