import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/DB.js";
dotenv.config({
  path: "./env",
});

const PORT = 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed....", error);
  });
