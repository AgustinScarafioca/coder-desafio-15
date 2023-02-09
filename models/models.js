import mongoose from "mongoose";

const collectionProductos = "productos";

const schemaProductos = new mongoose.Schema({
    timestamp: String,
    name: String,
    description: String,
    code: String,
    price: Number,
    thumbnail: String,
    stock: Number,
});

const models = mongoose.model(collectionProductos, schemaProductos);

export default models;