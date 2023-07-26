const e = require("express");
const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const {title, description, price, imgUrl} = req.body;

  let newProduct = new Product({
    title,
    description,
    price,
    imgUrl,
  });

  newProduct = await newProduct.save();

  res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
};

exports.products = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

exports.product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.json({message: "Product does not found :("});
      return;
    }

    res.json(product);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const {title, description, price, imgUrl} = req.body;

  let updatedProduct = new Product({
    title,
    description,
    price,
    imgUrl,
    _id: req.params.id
  });

  updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProduct);

  res.json({message: `Product with id ${req.params.id} updated sucessfully!`});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);

    res.json({message: `Product with id ${req.params.id} deleted sucessfully!`});
  } catch (e) {
  res.status(500).json({error: e.message});
  }
};