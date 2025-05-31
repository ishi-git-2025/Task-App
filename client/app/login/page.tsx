"use client"
import React, { useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function page(){

    const {user} = useUserContext();
    const router = useRouter();

    useEffect(() =>{
        //redirect to homepage if user is already logged in
        if(user && user._id){
            router.push("/");
        }
    },[user, router]);

    //return null so that logged-in user doesn't see the login form as redirects in React/Next.js don't happen instantly
    if (user && user._id){
        return null;
    }

    return <div className="auth-page w-full h-full flex justify-center items-center">
        <LoginForm />
    </div>
}

export default page;
//for Next.js to know this is the main component for route /login.