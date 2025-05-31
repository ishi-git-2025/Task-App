import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, {
    createContext,
     useEffect, useState, useContext} from 'react';
import toast from 'react-hot-toast';

// defining a context where user info can be shared
//creating React Context to share data across many components without passing props manually at every level.
const UserContext =  React.createContext();

export const UserContextProvider = ({children}) => {

    const serverUrl = 'http://localhost:8000';

    const router = useRouter(); //nextjs hook
    const [user, setUser] = useState(null);
    const [userState, setUserState] = useState({
        name:"",
        email:"",
        password:""
    }) //Initially all fields are empty strings

    //to keep track of whether the app is still loading
    const [loading, setLoading] = useState(false);

    //register user
    const registerUser = async (e) => {
        e.preventDefault(); // Prevent page reload
        if(
            !userState.email.includes("@") || 
            !userState.password ||
            userState.password.length < 6
        )
        {   //pop up message
            toast.error("Please enter a valid email and password (min 6 char)");
            return;
        }

    try { //Sending API Request
        const res = await axios.post(`${serverUrl}/api/v1/register`,userState);
        console.log(res.data)
        toast.success("user registered successfully");

        //clear the form
        setUserState({
            name:"",
            email:"",
            password:""
        })

        //redirect to login page
        router.push("/login");
        
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong";
        toast.error(message);
        }
    };

     //dynamic form handler, Instead of writing separate handlers for each input field
    const handlerUserInput = (name) => (e) =>{ //curried function
    const value = e.target.value

    setUserState((prevState)=>({
        ...prevState, //copies all existing key-value pairs in the state
        [name]: value
    }));
    };

    useEffect(() => { userLoginStatus();}, []);

    //Login the user
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverUrl}/api/v1/login`,{
                email: userState.email,
                password: userState.password,
            },
            {
                withCredentials: true //tells the browser to accept cookies from the response
            }
            );

            toast.success("User logged in successfully")

            //clear the form
            setUserState({
                email:"",
                password:"",
            });

            //push user to homepage or dashboard page
            router.push("/");

        } catch (error) {
            console.log("error logging in user",error);
            toast.error(error.response.data.message)
        }
        // setLoading(true)
    };

    // logout user
    const logoutUser = async () => {
        try {
        const res = await axios.get(`${serverUrl}/api/v1/logout`, {
            withCredentials: true, // send cookies to the server
        });

        toast.success("User logged out successfully");

        // redirect to login page
        router.push("/login");
        } catch (error) {
        console.log("Error logging out user", error);
        toast.error(error.response.data.message);
        }
    };

    //get user logged in status
    const userLoginStatus = async () => {
        setLoading(true);
        let loggedIn = false;
        try {
            const res = await axios.get(`${serverUrl}/api/v1/login-status`,{
                withCredentials: true,// send cookies to the server
            });

            //forcing res.data string into a boolean.
            loggedIn = !!res.data;
            setLoading(false);

            if(!loggedIn){
                router.push("/login");
            };
             return loggedIn; //<-- return value!

        } catch (error) {
            console.log("error occured in logging out user",error);
        }
        setLoading(false);
    };
    
    //get user details
    const getUser = async () =>{
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/v1/user`,{
                withCredentials:true,
            });
            console.log('res of user api -->>>',res.data);
            setUser((prevState)=>{
                return{
                    ...prevState,
                    ...res.data,
                }
            });

        } catch (error) {
            console.log("error getting user details", error);
            setLoading(false)
        }
        setLoading(false)
    };

    useEffect(() =>{
        const loginStatusGetUser = async () =>{
        const isLoggedIn = await userLoginStatus();
        console.log("calling loginStatusGetUser",isLoggedIn)
        // setLoading(true)

        if(isLoggedIn){
            console.log("user is logged in")
            getUser();
        }
       };

       loginStatusGetUser(); //calling
    },[]);

    return(
        <UserContext.Provider value={{
            registerUser, 
            userState,
            handlerUserInput,
            loginUser,
            logoutUser,
            userLoginStatus,
            getUser,
            user,
            loading
            }}>
            {children}
        </UserContext.Provider>
    )
};


export const useUserContext = () => {
    return useContext(UserContext)
}



