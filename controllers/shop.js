const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            prods: products
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            prods: products
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart'
    });
}

exports.postCart = (req, res, next) => {
    console.log(req.body.productId);
    Product.findById(req.body.productId, product => {
        Cart.addToCart(product.id, product.price);
        res.render('shop/cart', {
            pageTitle: 'Your Cart'
        });
    });
    
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout'
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.id;
    Product.findById(prodId, product => {
        
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Detail'
        });
    });
}