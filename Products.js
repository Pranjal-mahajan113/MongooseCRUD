const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Productdatabase")
  .then(() => {
    console.log("Connected to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

//----Creating Schema--------------------------

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

//Creating Schema------------------------------------
const Product = new mongoose.model("product", productSchema);

//Creating Post-----------------------------------
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body); //create new document
    const saveProduct = await product.save(); //wait for it to save
    res.status(201).json(saveProduct); //send response
  } catch (err) {
    res.status(400).send(err); //handle errors
  }
});

//Get request-----------------------------------------
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Put request-----------------------------------------------
app.put("/products/:id", async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});



//delete request---------------------------
app.delete("/products/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product delete suceesfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//START SERVER-----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
