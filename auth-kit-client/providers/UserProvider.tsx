"use client"; //Tells Next.js that this component should be run on the client side
import React from 'react';
import {UserContextProvider} from '../context/userContext.js'
//wraping my app in that context, enabling access

interface Props{ //This TypeScript interface will receive a children that must be of type React.ReactNode (JSX, <myComponent /> etc)
    children: React.ReactNode; 
}

function UserProvider({children}:Props){//children must match the Props interface
    return <UserContextProvider>{children}</UserContextProvider>
}
// any component passed as children will now have access to the context data provided by UserContextProvider
export default UserProvider;