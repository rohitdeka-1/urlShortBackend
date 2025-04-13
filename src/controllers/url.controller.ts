import Url from "../models/url.model";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import dns from "dns";
import protocolChecker from "../utils/protocols";

const linkShortener = async (req: Request, res: Response): Promise<any> => {
  const { originalURL } = req.body;
  console.log("BODY:", req.body);
  if (!originalURL) {
    return res.status(400).json({
      message: "URL is required",
    });
  }
  const url = new URL(originalURL);

  if(!protocolChecker(url)){
    return res.status(400).json({
      "message":"Invald protocol",
      "code": "INVALID_PROTOCOL"
    })
  }

  await dns.resolve(url.hostname, async (err) => {
    if (!err) {
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

        return res.status(200).json({
          message: "Saved",
          id: entry.shortId,
        });
      }

      return res.status(200).json({
        message: "already exists",
        id: existedURL?.shortId,
      });
    } else {
      return res.status(406).json({
        message: "Invalid Url",
        code: "URL_DOESNT_EXITS",
      });
    }
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
