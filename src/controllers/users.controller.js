const User = require("../models/user.model");
const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json({message: "Success", data: users})
    } catch (error) {
        res.status(500).json({message: "Internal Server error"});
    }
}

module.exports = {
    getUsers
}