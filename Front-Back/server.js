import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";
import auth from "./api/auth.route.js";

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use('/api/v1/auth', auth);
app.use("/api/v1/reviews", reviews);

export default app;