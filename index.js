import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from 'mongoose'

import { MSG_CONNECTION } from "./utils/messages.js"
import { ORIGIN_LIST } from "./utils/definitions.js"

const app = express();
dotenv.config();

const connectDB = async () => {
    try {
        console.log(MSG_CONNECTION.MONGODB_CONNECTING);
        await mongoose.connect(process.env.MONGODB_DEV);
        console.log(MSG_CONNECTION.MONGODB_CONNECTED);
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

app.use(cors({origin: ORIGIN_LIST, credentials: true}));
app.use(express.json());

app.get("/api", (req, res) => {
    res.send(MSG_CONNECTION.WELCOME_SUPERAPP)
});
app.listen(8800, ()=> {
    connectDB();
    console.log(MSG_CONNECTION.ONLINE_SUPERAPP)
})