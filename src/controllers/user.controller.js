const userService = require('../services/user.service');
const { validateUser, validateUserId } = require('../middlewares/validators');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await userService.listUsers();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.userId, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    listUsers,
    updateUser,
    deleteUser
};
