
import Url from "../models/url.model";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const linkShortener = async (req: Request, res: Response): Promise<any> => {
  const { originalURL } = req.body;
  if (!originalURL) {
    res.status(400).json({
      message: "URL is required",
    });
  }

  const nanoID = nanoid(5);

  const entry = await Url.create({
    shortId: nanoID,
    redirectURL: originalURL,
    visitHistory: [],
    visitedCount: 0,
  });

  if (!entry) {
    res.status(401).json({
      message: "Error with DB",
    });
  }

  res.status(200).json({
    message: "Saved",
    id: entry.shortId,
  });
};

const linkRedirector = async (req: Request, res: Response): Promise<any> => {
  const { nanoID } = req.params;
  const entry = await Url.findOneAndUpdate(
    {
      nanoID,
    },
    {
      $push: {
        visitHistory: [{ timeStamp: Date.now().toString() }],
      },
      $inc: {
        visitedCount: 1,
      },
    }
  );

  if(!entry){
    res.status(500).json({
      "message":"Internal Server Error"
    })
  }

  res.redirect(entry!.redirectURL)


};
export { linkShortener, linkRedirector };

