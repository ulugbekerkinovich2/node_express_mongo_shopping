const fileUpload = require("express-fileupload");
const cors = require("cors");
const connectDB = require('../../config/db');
const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const productRoutes = require('../routes/productRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
const orderRoutes = require('../routes/orderRoutes');






const modules = (app, express) => {
    connectDB();
    app.use(cors());
    app.use(fileUpload());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(`${process.cwd()}/uploads`));
    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/wishlist', wishlistRoutes);
    app.use('/api/orders', orderRoutes);
};

module.exports = modules;
