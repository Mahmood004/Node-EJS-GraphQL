const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');
module.exports = class Cart {
    static addToCart(id, productPrice) {
        fs.readFile(p, (err, fileContents) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContents);
            }

            const existingIndex = cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingIndex];

            let updatedProduct;

            if (existingProduct) {
                updatedProduct = {...existingIndex};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }
}