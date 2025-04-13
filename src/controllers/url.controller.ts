import Url from "../models/url.model";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const linkShortener = async (req: Request, res: Response): Promise<any> => {
  const { originalURL } = req.body;
  if (!originalURL) {
    return res.status(400).json({
      message: "URL is required",
    });
  }

  const nanoID = nanoid(5);

  try {
    const entry = await Url.create({
      shortId: nanoID,
      redirectURL: originalURL,
      visitHistory: [],
      visitedCount: 0,
    });

    if (!entry) {
      return res.status(500).json({
        message: "Error creating URL",
      });
    }

    return res.status(200).json({
      message: "Saved",
      id: entry.shortId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating URL",
    });
  }
};

const linkRedirector = async (req: Request, res: Response): Promise<any> => {
  const { shortId } = req.params;

  try {
    const entry = await Url.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    entry.visitHistory.push({ timeStamp: new Date().toISOString() });
    entry.visitedCount += 1;
    await entry.save();

    return res.redirect(entry.redirectURL);
  } catch (error) {
    return res.status(500).json({
      message: "Error redirecting",
    });
  }
};

export { linkShortener, linkRedirector };

