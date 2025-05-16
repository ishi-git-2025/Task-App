"use client"
import { useUserContext } from "@/context/userContext";
import React from "react";

//using tailwind css
function RegisterForm(){

    const {registerUser, userState, handlerUserInput} = useUserContext();
    const {name, email, password} = userState;
    
    const [showPassword, setShowPassword] = React.useState(false); //useState hook returns an array [current state(false), func to call to update the value of showPassword]
    const togglerPassword = () => setShowPassword(!showPassword);

    return <form className="m-[2rem] px-10 py-14 rounded-lg shadow-lg bg-white w-full max-w-[520px]">
        <div className="relative z-10">
            <h1 className="mb-2 text-center text-[1.35rem]">
                Register for an account
            </h1>
            <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
                Create an account. Already have an account?
                <a
                    href='/login'
                    className="font-bold text-[#5c7be7] hover:text-[#25209c] transition-all duration-300">
                        {" "}Login here
                </a>
            </p>
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-[#999]">
                    Full Name
                </label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e)=> handlerUserInput("name")(e)}
                name="name"
                className="px-4 py-3 border-[1px] border-gray-400 rounded-md outline-[#5c7be7] text-gray-800"
                placeholder="Ishita Agrawal"
                />
            </div>
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
            <div className="flex">
                <button type="submit"
                disabled={!name || !email || !password}
                onClick={registerUser}
                className="mt-[1.5rem] shadow-sm flex-1 px-4 py-3 font-bold bg-[#5c7be7] text-white rounded-md hover:bg-[#1abc9c] transition-colors">
                    Register Now
                </button>
            </div>
        </div>
        </form>;
}

export default RegisterForm;