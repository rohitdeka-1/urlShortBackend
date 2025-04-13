import Url from "../models/url.model";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const linkShortener = async (req: Request, res: Response): Promise<any> => {
  const { redirectURL } = req.body;
  if (!redirectURL) {
    return res.status(400).json({
      message: "URL is required",
    });
  }

  const nanoID = nanoid(5);

  const entry = await Url.create({
    shortId: nanoID,
    redirectURL: redirectURL,
    visitHistory: [],
    visitedCount: 0,
  });

  if (!entry) {
    return res.status(401).json({
      message: "Error with DB",
    });
  }

  res.status(200).json({
    message: "Saved",
    shortUrl: `http://localhost:3000/${entry.shortId}`,
    id: entry.shortId,
  });
};

const linkRedirector = async (req: Request, res: Response): Promise<any> => {
  const { nanoId } = req.params;
  const entry = await Url.findOneAndUpdate(
    {
      shortId: nanoId,
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
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }

  res.redirect(entry!.redirectURL);
};

export { linkShortener, linkRedirector };

