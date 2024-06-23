const mongoose = require('mongoose');
const userService = require('../src/services/user.service');
const User = require('../src/models/user.model'); // Adjust the path accordingly

// Mock user.model.js
jest.mock('../src/models/user.model', () => ({
    findById: jest.fn(),
    save: jest.fn()
}));

// Mock mongoose and ObjectId
jest.mock('mongoose', () => {
    const mockObjectId = jest.fn().mockImplementation((id) => id);
    return {
        Types: {
            ObjectId: mockObjectId
        },
        model: jest.fn()
    };
});

// Mock data for testing
const mockUser = {
    _id: '6677d0222522a2b9e4331b65', // Mocked MongoDB ObjectID
    email: 'testuser@example.com',
    name: 'Test User',
    age: 30,
    city: 'Test City',
    zipCode: '12345'
};

describe('User Service Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            // Mock the save method of User model
            User.prototype.save.mockResolvedValue(mockUser);

            const createdUser = await userService.createUser(mockUser);

            expect(createdUser.email).toEqual(mockUser.email);
            expect(createdUser.name).toEqual(mockUser.name);
            expect(createdUser.age).toEqual(mockUser.age);
            expect(createdUser.city).toEqual(mockUser.city);
            expect(createdUser.zipCode).toEqual(mockUser.zipCode);

            // Ensure save method is called once
            expect(User.prototype.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an error when createUser fails', async () => {
            // Mock the save method to throw an error
            User.prototype.save.mockRejectedValue(new Error('Database error'));

            await expect(userService.createUser(mockUser)).rejects.toThrow('Database error');
        });
    });

    describe('getUserById', () => {
        it('should return user details by ID', async () => {
            // Mock the findById method of User model to resolve with mockUser
            User.findById.mockResolvedValue(mockUser);

            const foundUser = await userService.getUserById(mockUser._id); // Use mocked _id

            expect(foundUser).toEqual(mockUser);

            // Ensure findById method is called once with correct _id
            expect(User.findById).toHaveBeenCalledWith(mockUser._id);
            expect(User.findById).toHaveBeenCalledTimes(1);
        });

        it('should throw an error when getUserById fails', async () => {
            // Mock the findById method to reject with an error
            const error = new Error('Database error');
            User.findById.mockRejectedValue(error);

            await expect(userService.getUserById(mockUser._id)).rejects.toThrow(error);
        });
    });

});
