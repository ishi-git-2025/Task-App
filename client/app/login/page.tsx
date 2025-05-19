import React from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";

function page(){
    return <div className="auth-page w-full h-full flex justify-center items-center">
        <LoginForm />
    </div>
}

export default page;
//for Next.js to know this is the main component for route /login.