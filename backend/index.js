import express from "express";
import 'dotenv/config';
import "./Models/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./Routes/AuthRouter.js"
import ProductRouter from "./Routes/ProductRouter.js"
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.use("/products",ProductRouter)
app.get("/ping",(req,res)=>{
    res.send('PONG')
})


app.listen(PORT,(req,res)=>{
    console.log("Server is running on port:",PORT);
})
