import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoute";
import { seedInitialProducts } from "./services/productServices";
import routerProduct from "./routes/productRoute";
import routerCart from "./routes/cartRoute";
import dotenv from "dotenv";

const app =express();
const port = 3001;
dotenv.config();

mongoose.connect(process.env.DATABASE_URL || "")
.then(() => console.log("Connecting Success"))
.catch((err) => console.log("Faild" , err));
app.use(express.json());


seedInitialProducts();

app.use("/user", router);
app.use("/product", routerProduct);
app.use("/cart", routerCart);


app.listen(port,()=>{
    console.log(`Server is running at: http://localhost:${port}`);
})
    
