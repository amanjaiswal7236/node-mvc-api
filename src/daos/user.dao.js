const User = require('../models/user.model');

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getUserById = async (userId) => {
    return await User.findById(userId).where({ isDeleted: false });
};

const listUsers = async () => {
    return await User.find({ isDeleted: false });
};

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
};

module.exports = {
    createUser,
    getUserById,
    listUsers,
    updateUser,
    deleteUser
};
