const Wishlist = require('../models/Wishlist');
const Joi = require('joi');

const wishlistSchema = Joi.object({
    productId: Joi.string().required(),
});

exports.addToWishlist = async (req, res) => {
    try {
        const { error } = wishlistSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { productId } = req.body;
        const userId = req.user.id;

        const wishlistItem = new Wishlist({
            userId,
            productId,
        });

        await wishlistItem.save();
        res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ userId: req.user.id }).populate('productId');
        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findOneAndDelete({ userId: req.user.id, productId: req.params.productId });
        if (!wishlistItem) return res.status(404).json({ message: 'Product not found in wishlist' });
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
