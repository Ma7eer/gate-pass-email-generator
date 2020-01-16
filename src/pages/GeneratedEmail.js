import React from "react";
import { useParams } from "react-router-dom";

const GeneratedEmailPage = () => {
  let { name, civilId } = useParams();
  return (
    <h1>
      {name}: {civilId}
    </h1>
  );
};

export default GeneratedEmailPage;
