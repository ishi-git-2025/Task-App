import jwt from 'jsonwebtoken';

//using user id to generate token
const generateToken = (id) =>{
    //token must be returned to the client
    return jwt.sign({id}, process.env.JWT_SECRET, { //secret key used to sign the token (password)
        expiresIn :'30d'
    })
};
export default generateToken;

// token payload -{ id: "64fe0a3e69a8e6d9f2f2a8a1", // MongoDB user _id
// iat: 1695000000,              // issued at
//   exp: 1697592000               // expires in }
