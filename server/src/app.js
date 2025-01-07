import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// Middleware
app.use(
  cors({
    //origin: 'https://invoice-ass-client.vercel.app',
    //origin: "http://localhost:5173",
   origin: "https://invoice-ass-client.onrender.com",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";
import salesRouter from "./routes/sales.routes.js";
import activityRouter from "./routes/activities.routes.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/activities", activityRouter);
app.use("/api/v1/users/sales", salesRouter);

//https://localhost:8000/api/v1/users/register

app.use((err, req, res, next) => {
      if (err instanceof ApiError) {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message,
          errors: err.errors || [],
        });
      }

      return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
      });
    });
export { app };
