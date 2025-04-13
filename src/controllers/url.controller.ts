import Url from "../models/url.model";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const linkShortener = async (req: Request, res: Response): Promise<any> => {
  const { originalURL } = req.body;
  console.log("BODY:", req.body);
  if (!originalURL) {
    res.status(400).json({
      message: "URL is required",
    });
  }

  const existedURL = await Url.findOne({ redirectURL: originalURL });

  if (!existedURL) {
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
  }

  res.status(200).json({
    message: "already exists",
    id: existedURL?.shortId,
  });
};

const linkRedirector = async (req: Request, res: Response): Promise<void> => {
  const { nanoId } = req.params;

  const entry = await Url.findOneAndUpdate(
    {
      shortId: nanoId,
    },
    {
      $push: {
        visitHistory: [{ timeStamp: new Date() }],
      },
      $inc: {
        visitedCount: 1,
      },
    }
  );

  if (!entry) {
    res.status(404).json({
      message: "Short URL not found",
    });
    return;
  }

  res.redirect(entry.redirectURL);
};
export { linkShortener, linkRedirector };
