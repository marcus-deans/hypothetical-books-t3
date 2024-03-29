import type { FormEventHandler } from "react";
import React, { useState } from "react";
import { api } from "../../utils/api";

export default function CreateUser() {
  const [userInfo, setUserInfo] = useState({ name: "", password: "", confirm: "" });
  const mutation = api.users.setPassword.useMutation();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    // validate your userinfo
    e.preventDefault();
    if (userInfo.password !== userInfo.confirm) {
      alert("Passwords must match");
    } else {
      mutation.mutate({ name: userInfo.name, password: userInfo.password });
      alert(
        "Password Successfully Set \n Please Return to Home Page and Log In"
      );
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
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
        {mutation.isLoading && <p>Loading!</p>}
      </form>
    </div>
  );
}
