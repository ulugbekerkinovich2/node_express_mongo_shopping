const mongoose = require('mongoose');
require("dotenv").config();
const config = require("./index");
const DB_URL = config.DB_URL;
const DB_PORT = config.DB_PORT;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/shoppingDB`);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;
