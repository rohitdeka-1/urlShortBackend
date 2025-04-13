import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()
const app = express();

const corsOptions = {
    origin: ["https://url-shortner-frontend-nx4y.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.json({
    limit:"15kb",
}))

app.use(express.urlencoded({extended:true}))

// Routes
import { urlRoute } from "./routes/url.route";
import { linkRedirector } from "./controllers/url.controller";

app.use("/url", urlRoute);
app.get("/:nanoId", linkRedirector)

export {app}