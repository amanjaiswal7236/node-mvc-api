const userDao = require('../daos/user.dao');

const createUser = async (userData) => {
    return await userDao.createUser(userData);
};

const getUserById = async (userId) => {
    return await userDao.getUserById(userId);
};

const listUsers = async () => {
    return await userDao.listUsers();
};

const updateUser = async (userId, updateData) => {
    return await userDao.updateUser(userId, updateData);
};

const deleteUser = async (userId) => {
    return await userDao.deleteUser(userId);
};

module.exports = {
    createUser,
    getUserById,
    listUsers,
    updateUser,
    deleteUser
};
