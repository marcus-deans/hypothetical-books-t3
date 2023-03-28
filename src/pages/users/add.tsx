import type { FormEventHandler } from "react";
import { api } from "../../utils/api";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import React, { useState } from "react";
import { hash } from "bcrypt";

export default function AddUser() {
    const [userInfo, setUserInfo] = useState({ name: "", password: "", confirm: "", admin: false });
    const mutation = api.users.createUser.useMutation();
    const router = useRouter();
    const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        // validate your userinfo
        e.preventDefault()
        if (userInfo.name == "" || userInfo.password == "" || userInfo.confirm == "") {
            alert("All fields must be filled");
        }
        if (userInfo.password !== userInfo.confirm) {
            alert("Passwords must match");
        } else {
            mutation.mutate({ name: userInfo.name, password: userInfo.password, admin: userInfo.admin });
        }
    };
    if (mutation.isSuccess && mutation.data.success) {
        alert("Successfully created User: " + userInfo.name)
        setTimeout(() => {
            void router.push("/users");
        }, 500);

    }
    else {
        return (
            <div className="inline-block p-6 space-y-4 md:space-y-6 sm:p-8 w-3/12">
                {mutation.isSuccess && !mutation.data.success ? 
                <h1 className="text-xl font-bold leading-tight tracking-tight text-red-700 md:text-1xl dark:text-red">
                    {"Could not create User: " + mutation.data.message}
                </h1>: null}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create Account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={userInfo.name} onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })
                        } type="name" name="name" id="name" placeholder="Username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })
                        } type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input value={userInfo.confirm} onChange={({ target }) => setUserInfo({ ...userInfo, confirm: target.value })
                        } type="password" name="confirm" id="confirm" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is this User an Admin?</label>
                        <input type="checkbox" name="admin" id="admin" checked={userInfo.admin} onChange={({ target }) => setUserInfo({ ...userInfo, admin: target.checked })} />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="bg-gray-900 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit User</button>
                </form>
            </div>
        );
    }
}