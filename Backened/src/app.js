import express, { urlencoded } from "express";
import cors from "cors";
const app = express();
import cookieparser from "cookie-parser";
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieparser());

//Routes
import UserRoute from "./routes/User.route.js";
app.use("/api/v1", UserRoute);
// http://localhost:8001/api/v1/message

export { app };
