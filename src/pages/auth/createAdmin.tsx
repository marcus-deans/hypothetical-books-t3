import type { FormEventHandler } from "react";
import { api } from "../../utils/api";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import React, { useState } from "react";
import { hash } from "bcrypt";

export default function CreateAdmin() {
    const [userInfo, setUserInfo] = useState({ password: "", confirm: "" });
    const mutation = api.users.createAdmin.useMutation();
    const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        // validate your userinfo
        e.preventDefault();
        if (userInfo.password !== userInfo.confirm) {
            alert("Passwords must match");
        } else {
            mutation.mutate({ password: userInfo.password });
            alert(
                "Password Successfully Set \n Please Return to Home Page and Log In"
            );
        }
    };
    return (
        <div className="inline-block p-6 space-y-4 md:space-y-6 sm:p-8 w-3/12">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Create admin Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-white">Password</label>
                    <input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })
                    } type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                    <input value={userInfo.confirm} onChange={({ target }) => setUserInfo({ ...userInfo, confirm: target.value })
                    } type="password" name="confirm" id="confirm" placeholder="••••••••" className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button onClick={handleSubmit} type="submit" className="bg-gray-900 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Create admin Account</button>
            </form>
        </div>
    );
}