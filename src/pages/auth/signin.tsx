/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";

export default function Signin(){
  const [userInfo, setUserInfo] = useState({password: "" });
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    if(userInfo.password.length === 0){
      alert("Please Enter a Password")
    }
    e.preventDefault();
    const res = await signIn("credentials", {
        password: userInfo.password,
        redirect: true,
    }).catch().then()
    
    if(res?.error){
      alert("Password was incorrect.");
    } else{
      alert("Sign-in Successful, please proceed.");
      setTimeout(() => {
        void router.push(`/books`);
      }, 500);
    }
    
  };

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

