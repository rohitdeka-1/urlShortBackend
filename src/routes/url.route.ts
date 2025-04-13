import express from "express";
import { linkShortener } from "../controllers/url.controller";

const urlRoute = express.Router();

urlRoute.post("/shorten",linkShortener);


export {urlRoute};
