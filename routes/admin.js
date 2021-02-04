const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/admin/add-product', adminController.getAddProduct);

router.post('/admin/add-product', adminController.postAddProduct);

router.get('/admin/products', adminController.getProducts);

module.exports = router;