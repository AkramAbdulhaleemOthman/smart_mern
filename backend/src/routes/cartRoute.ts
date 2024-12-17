import express from "express";
import {  addItemToCart, deleteItemIncart, getActiveCartForUser, updateItemInCart } from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";


const routerCart = express.Router();

routerCart.get("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
      const cart = await getActiveCartForUser({userId});
        res.status(200).send(cart);
 },);

 routerCart.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

routerCart.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});
 
routerCart.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemIncart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("Something went wrong!");
    }
  }
);
 export default  routerCart;