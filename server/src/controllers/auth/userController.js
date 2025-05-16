import asyncHandler from 'express-async-handler'; //to catch errors in async functions so no need to write try-catch
import User from "../../models/auth/UserModel.js"
import generateToken from '../../helpers/generateToken.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async(req, res) =>{
   
    const{name, email, password} = req.body;

    //input validation
    if (!name || !email || !password){
        return res.status(400).json({message :"All fields are required"});
    }

    //Password length
    if (password.length < 6){
        return res.status(400).json({message:"Password must be atleast 6 characters"});
    }

    //check for existing user
    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:"User already exists!"});
    }

    //create/add new user
    const user = await User.create({
        name,
        email,
        password
    });

    //generate token 
    const token = generateToken(user._id);

    //sending the JWT token to the client browser as a cookie
    res.cookie("token", token, {
        path:'/', //Cookie is valid for the entire site -/ means all routes
        httpOnly: true,
        maxAge: 30*24*60*60*1000 , //30 days
        sameSite:true,
        secure: true,
    })

    if (user){ //If creation successful, send back selected user info
        const {_id, name, email, role, photo, bio, isVerified} = user;
        return res.status(201).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    } else{
        return res.status(400).json({message:"Invalid user data"});
    }
});

export const loginUser = asyncHandler(async (req, res) =>{
    //get email and password from request
    const {email, password} = req.body;

    //validate if blank
    if(!email || !password){
        return res.status(400).json({message:"All fields are requires"})
    }

    //check if user exists
    const userExists = await User.findOne({email});

    if (!userExists){
        return res.status(404).json({message :"User not found, Sign Up!"});
    }

    //check if password matches the hashed password in db
    const isMatch = await bcrypt.compare(password, userExists.password );

    if(!isMatch){
        return res.status(400).json({message:"invalid Credentials"});
    }

    //generate token with user id
    const token = generateToken(userExists._id);

    if(userExists && isMatch){
        const { _id, name, email, role, photo, bio, isVerified} = userExists;
    
        //set the token in the cookie
        res.cookie("token", token, {
        path:'/', 
        httpOnly: true,
        maxAge: 30*24*60*60*1000 , //30 days
        sameSite:true,
        secure: true,
        });

        // send back the user and token in the response to the client
          res.status(200).json({
            _id,
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    } else{
        res.status(400).json({message:"Invalid email or password"});
    }
});

//logout user
export const logoutUser = asyncHandler(async (req,res)=>
{
    res.clearCookie("token");
    res.status(200).json({message:"user logged out"});
});

export const getUser = asyncHandler(async (req, res) => {
  // get user details from the token ----> exclude password
  const user = await User.findById(req.user._id).select("-password"); //protect middleware is allowing us to access user

  if (user) {
    res.status(200).json(user);
  } else {
    // 404 Not Found
    res.status(404).json({ message: "User not found" });
  }
});

// login status
export const userLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    // 401 Unauthorized
    res.status(401).json({ message: "Not authorized, please login!" });
  }
  // verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    res.status(200).json(true);
  } else {
    res.status(401).json(false);
  }
});