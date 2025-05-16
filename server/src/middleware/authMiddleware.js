import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';
import User from "../models/auth/UserModel.js";

//checking if the user is logged in using a JWT stored in cookies
export const protect = asyncHandler(async (req, res, next) => {
    try {
        //check if user is logged in
        const token = req.cookies.token;

        if (!token){
            res.status(401).json({message:"not authorised, please login"})
        }
        //verifyy the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user details from the token ----> exclude password
        const user = await User.findById(decoded.id).select("-password");

        //check if user exists
        if(!user){
            res.status(404).json({message:"user not found!"});
        }

        //set user details in the request object, Adds the user to req.user so the protected route can access it
        req.user =user;

        next();
        //calls next() to pass control to getUser
    } catch (error) {
        res.status(401).json({message:"not authorized, token failed!"});
    }
})