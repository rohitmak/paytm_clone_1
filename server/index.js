import express from "express";
const app = express();

// IMPORTS
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// MIDDLEWARES
app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// DATABASE
import connectDB from "./db/db.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR!!: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION FAILED!! `, error);
  });

// ROUTERS
import userRouter from "./routes/user.routes.js";
import accountRouter from "./routes/account.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);
