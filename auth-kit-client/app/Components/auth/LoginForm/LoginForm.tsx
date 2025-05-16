"use client"
import { useUserContext } from "@/context/userContext";
import React from "react";

//using tailwind css
function LoginForm(){

    const {loginUser, userState, handlerUserInput} = useUserContext();
    const {name, email, password} = userState;
    const [showPassword, setShowPassword] = React.useState(false);
    
    const togglerPassword = () => setShowPassword(!showPassword);

    return <form className="m-[2rem] px-10 py-14 rounded-lg shadow-lg bg-white w-full max-w-[520px]">
        <div className="relative z-10">
            <h1 className="mb-2 text-center text-[1.35rem]">
                Login To Your Account
            </h1>
            <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
                Login now, Don't have an account?
                <a
                    href='/register'
                    className="font-bold text-[#5c7be7] hover:text-[#25209c] transition-all duration-300">
                        {" "}Register here
                </a>
            </p>
           
             <div className="mt-[1rem] flex flex-col">
                <label htmlFor="email" className="mb-1 text-[#999]">
                    Email
                </label>
                <input
                type="text"
                id="email"
                value={email}
                onChange={(e)=> handlerUserInput("email")(e)}
                name="email"
                className="px-4 py-3 border-[1px] border-gray-400 rounded-md outline-[#5c7be7] text-gray-800"
                placeholder="testmail@gmail.com"
                />
            </div>
                         <div className="relative mt-[1rem] flex flex-col">
                <label htmlFor="password" className="mb-1 text-[#999]">
                    Password
                </label>
                <input
                type={showPassword ? "text":"password"}
                id="password"
                value={password}
                onChange={(e)=> handlerUserInput("password")(e)}
                name="password"
                className="px-4 py-3 border-[1px] border-gray-400 rounded-md outline-[#5c7be7] text-gray-800"
                placeholder="*********"
                />
                <button type="button" className="absolute p-1 right-4 top-[43%] text-[20px] opacity-45">
                    {
                       showPassword ?(
                        <i className="fas fa-eye-slash" onClick={togglerPassword}></i>
                       ):(
                        <i className="fas fa-eye" onClick={togglerPassword} ></i>
                       )
                    }
                    
                </button>
            </div>
            <div className="mt-4 flex justify-end">
                <a href=''
                className="font-bold text-[#5c7be7] text-[14px] hover:text-[#25209c] transition-all duration-300">
                Forgot password?</a>
            </div>
            <div className="flex">
                <button type="submit"
                disabled={ !email || !password}
                onClick={loginUser}
                className="mt-[1.5rem] shadow-sm flex-1 px-4 py-3 font-bold bg-[#5c7be7] text-white rounded-md hover:bg-[#1abc9c] transition-colors">
                    Sign in
                </button>
            </div>
        </div>
        </form>;
}

export default LoginForm;