import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { FormEventHandler, useState } from "react";

const SignIn: NextPage = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState({password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
    const res = await signIn("credentials", {
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
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
};




export default SignIn;