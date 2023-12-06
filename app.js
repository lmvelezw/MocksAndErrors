import express from "express";
import router from "./routes/products.js";
import CustomError from "./services/errors/customError.js";

const app = express();

const PORT = 8080;

app.use(express.json());

// app.get("/mockingproducts", (req, res) => {
//   let result = "Producto";

//   for (let i = 0; i < 101; i++) {
//     result += "Producto" + i;
//   }
//   res.send(result);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    const cause = ErrorCauses[err.cause] || "Unknown cause";
    res.status(err.statusCode).json({ error: err.message, cause});
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/", router);
