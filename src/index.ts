import { error } from "console";
import { app } from "./app";
import connectDB from "./db";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Internal server error :", error);
  });
