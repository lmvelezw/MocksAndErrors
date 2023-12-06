import { Router } from "express";
import CustomError from "../services/errors/customError.js";
import ErrorTypes from "../services/errors/enums.js";
import { ErrorCauses } from "../services/errors/info.js";
import { generateProduct } from "../utils/utils.js";

const router = Router();

let products = [];

router.get("/mockingproducts", (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }

  res.send({ status: "success", payload: products });
});

router.post("/", (req, res) => {
  const { id, description, name } = req.body;

  if (!id || !description || !name) {
    CustomError.createError({
      statusCode: 400,
      causeKey: "MISSING_PRODUCT_INFO",
      message: "Product info incomplete",
    });
  }

  let product = {
    id,
    name,
    description,
  };

  products.push(product);
  res.send({ status: "success", payload: product });
});




router.get("/id", (req,res)=>{
  const {id} = req.query;
  let findId = products.find(product => product.id === id)

  if (!foundProduct) {
    return next(
      CustomError.createError({
        statusCode: 404,
        causeKey: "PRODUCT_NOT_FOUND",
        message: "Product not found in the products array",
      })
    )}

    res.send({ status: "success", payload: foundProduct })
})

export default router;
