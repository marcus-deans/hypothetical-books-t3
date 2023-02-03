import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { FormEventHandler, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		setUserInfo({password: ""});
    setError("");
    // validate your userinfo
    e.preventDefault();
		var res
		try{
			res = await signIn("credentials", {
				password: userInfo.password,
				redirect: false,
			});
		} catch(err){
			res = null
		}

    console.log(res);
  };
  const handleChange  = (Event: any) =>{
    setUserInfo(Event.target.value);
}
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