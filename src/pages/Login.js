import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("login", async user => {
      await window.localStorage.setItem("user", user);
      history.push("Home");
    });
  }

  const netlifyRef = useRef(null);

  return (
    <button
      ref={netlifyRef}
      style={{
        margin: "0 auto",
        marginTop: "20%",
        marginBottom: "20%",
        padding: "10px"
      }}
    >
      <div data-netlify-identity-button></div>
    </button>
  );
};

export default Login;
