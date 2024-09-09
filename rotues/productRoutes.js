const express = require('express');;
const { fetchProductDetail } = require('../controllers/productController');

const router = express.Router();

router.get('/products', fetchProductDetail);

module.exports = router;