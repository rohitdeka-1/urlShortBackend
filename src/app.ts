import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()
const app = express();

const corsOptions = {
    
    origin: ["https://url-shortner-frontend-nx4y.vercel.app", "https://urlshortbackend-2phu.onrender.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

app.use(express.json({
    limit:"15kb",
}))

app.use(express.urlencoded({extended:true}))


import { urlRoute } from "./routes/url.route";
import { linkRedirector } from "./controllers/url.controller";

app.use("/url",urlRoute);
app.get("/:nanoId",linkRedirector)

export {app}