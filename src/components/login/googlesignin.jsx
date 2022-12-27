import React, { useEffect } from "react";
import "./googlesignin.css";
import jwtDecode from "jwt-decode";

function SigninWithGoogle() {
  const handleGoogleResp = (response) => {
    console.log("JWT token:" + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "211787875021-57v7uu1q3o13o86d9eaosn7dbudpi59p.apps.googleusercontent.com",
      callback: handleGoogleResp,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <>
      <div id="signInDiv"></div>
    </>
  );
}

export default SigninWithGoogle;
