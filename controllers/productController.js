const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('products', { products });
    } catch (error) {
        req.flash('error_msg', 'Error loading products');
        res.redirect('/');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            req.flash('error_msg', 'Product not found');
            return res.redirect('/products');
        }
        res.render('product-detail', { product });
    } catch (error) {
        req.flash('error_msg', 'Error loading product');
        res.redirect('/products');
    }
};

// API endpoints
exports.getProductsApi = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

exports.getProductByIdApi = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
}; 