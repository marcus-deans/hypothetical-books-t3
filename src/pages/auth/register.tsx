import React, { FormEventHandler, useState } from "react";
import { api } from "../../utils/api";

export default function register(){
  const [userInfo, setUserInfo] = useState({password: "", confirm: ""});
  const mutation = api.users.setPassword.useMutation();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
    if (userInfo.password !== userInfo.confirm) {
      alert("Passwords must match");
    } else {
      mutation.mutate({password: userInfo.password});
      alert("Password Successfully Set \n Please Return to Home Page and Log In");
    }
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