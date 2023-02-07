import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { FormEventHandler, useState } from "react";
import { api } from "../utils/api"

interface Props {}

export default function Register() {
  const [userInfo, setUserInfo] = useState({password: "", confirm: ""});
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    const pass = userInfo.password
    e.preventDefault();
    /*
    const res = await api.users.setPassword.useMutation({
        password: pass,
    })
    */
   const infoWrapper = (input: {
    password: string,
    confirm: string
   }) => {
    setUserInfo(input);
   }

    console.log("We made it");
  };
  return (
    <div className="sign-up-form">
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
        <input
          value={userInfo.confirm}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, confirm: target.value })
          }
          type="password"
          placeholder="********"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};