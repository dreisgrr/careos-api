import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { MSG_CONNECTION } from "./utils/messages.js";
import { ORIGIN_LIST } from "./utils/definitions.js";

import formRoutes from "./routes/formRoutes.js";

const app = express();
dotenv.config();
let isDBConnected = false;

const connectDB = async () => {
  try {
    console.log(MSG_CONNECTION.MONGODB_CONNECTING);
    await mongoose.connect(process.env.MONGODB_DEV);
    console.log(MSG_CONNECTION.MONGODB_CONNECTED);
    isDBConnected = true;
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log(MSG_CONNECTION.MONGODB_DISCONNECTED);
});
mongoose.connection.on("connected", () => {
  console.log(MSG_CONNECTION.MONGODB_CONNECTED);
});

app.use(cors({ origin: ORIGIN_LIST, credentials: true }));
app.use(express.json());

app.use("/api/forms", formRoutes);

app.get("/ping", (req, res) => {
  res.send(MSG_CONNECTION.WELCOME_SUPERAPP);
});
app.get("/db", (req, res) => {
  res.send(isDBConnected);
});
app.listen(8800, () => {
  connectDB();
  console.log(MSG_CONNECTION.ONLINE_SUPERAPP);
});
