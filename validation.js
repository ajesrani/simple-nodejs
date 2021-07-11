const Joi = require('joi');

const schema = {
    name: Joi.string().min(3).required(),
    description: Joi.string().required()
};

const courseValidation = (course) => {
    return Joi.validate(course, schema)
};

module.exports.courseValidation = courseValidation;