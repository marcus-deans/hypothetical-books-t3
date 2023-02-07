import { InferGetServerSidePropsType, NextPage } from "next";
import React, { FormEventHandler, useState } from "react";
import { api } from "../../utils/api";

export default function register(){
  const [userInfo, setUserInfo] = useState({password: "", confirm: ""});
  const mutation = api.users.changePassword.useMutation();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("Start")
    // validate your userinfo
    e.preventDefault();
    mutation.mutate({password: userInfo.password});

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
        {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
        {mutation.isLoading && <p>Loading!</p>}
      </form>
    </div>
  );
};