import { Router } from "express";
import  { faker } from"@faker-js/faker";
faker.locale = "es";

const productosTest = Router();

productosTest.get("/", (req, res) => {
    let products = [];
    for (let i = 0; i < 6; i++) {
        products.push(crearProducto(i+1));
    }

    res.render("test", {productos});
});

function crearProducto(id) {
    return {
        id: id, 
        name: faker.commerce.product(),
        description: faker.commerce.product(),
        code: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.abstract(),
        stock: faker.commerce.price(),
    };
};

export default productosTest;