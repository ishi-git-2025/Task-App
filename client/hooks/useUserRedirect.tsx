"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const {user , loading} = useUserContext();
  const router = useRouter();

  useEffect(() => {

    if (loading) return; // wait for user to load

    if(!user || !user.email){
      router.push(redirect)
    }
    console.log("redirect hook is running and user is",user)
    //re-run the effect whenever any of these values change
  }, [ user, redirect, router]);
};

export default useRedirect;
