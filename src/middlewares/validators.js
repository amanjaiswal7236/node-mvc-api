const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required()
});

const userIdSchema = Joi.object({
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateUserId = (req, res, next) => {
    const { error } = userIdSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateUserUpdate = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { allowUnknown: true, presence: 'optional' });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateUser,
    validateUserId,
    validateUserUpdate
};
