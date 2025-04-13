import express from "express";
import dotenv from "dotenv";
dotenv.config()
const app = express();

app.use(express.json({
    limit:"15kb",
}))

app.use(express.urlencoded({extended:true}))


import { urlRoute } from "./routes/url.route";
import { linkRedirector } from "./controllers/url.controller";

app.use("/url",urlRoute);
app.get("/:nanoId",linkRedirector)

export {app}