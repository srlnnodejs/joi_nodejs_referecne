const Joi = require('joi');

// auth
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

// user
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().allow(null).allow('')
});

// create task
const createTaskSchema = Joi.object({
    title: Joi.string().min(10).max(50).required(),
    description: Joi.string().min(10).max(150).required(),
    completed: Joi.boolean().allow(null)
});

const productSchema= Joi.object({
    name: Joi.string().min(10).max(20).required(),
    details: Joi.string().min(10).max(20).required(),
    amount: Joi.number().min(2).required()
});

module.exports = {
    authSchema,
    userSchema,
    createTaskSchema,
    productSchema
}