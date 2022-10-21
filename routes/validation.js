const Joi = require('joi')


const registerValidate = data => {
    const schema = Joi.object(
        {
            name: Joi.string().max(255).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        }
    )
    const val = schema.validate(data);
    return val;
}

module.exports.registerValidation = registerValidate;
