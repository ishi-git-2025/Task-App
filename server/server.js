import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './db/connect.js';
import cookieParser from 'cookie-parser';
import fs from 'fs';
dotenv.config(); //load environment variables from .env file 

const port = process.env.PORT || 8000;

const app = express();

//middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//routes
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
    //use dynamic import
    import(`./src/routes/${file}`)
    .then((route) =>{
        app.use("/api/v1", route.default) // e.g. route defined at / would now be accessible at: /api/1/
    })
    .catch((err)=>
    {
        console.log('failed to load route file', err);
    });
});

const server = async () => {
    try {
        await connect() //db connection
        app.listen(port, () => {
        console.log(`server is running...on ${port}`);
    });
} catch (error) {
        console.log("failed to start server", error.message);
    }
    
}

server();