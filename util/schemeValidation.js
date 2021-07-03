const Joi = require('joi');

function wishListSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.string().required().messages({
            'string.base': `"userId" should be a type of 'text'`,
            'string.empty': `"userId" cannot be an empty field`,
           'any.required': `"a" is a required field`
          }),
          productId: Joi.string().required().messages({
            'string.base': `"productId" should be a type of 'text'`,
            'string.empty': `"productId" cannot be an empty field`,
           'any.required': `"a" is a required field`
          }),
          flag: Joi.number().valid(0,1).required().messages({
            'number.base': `"flag" should be a type of 'Number'`,
            'number.empty': `"flag" cannot be an empty field`,
            'any.required': `"a" is a required field`
          }),
        
    });
    validateRequest(req, next, schema ,1);
}

function fetchWishListSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.string().required().min(12).messages({
            'string.base': `"userId" should be a type of 'text'`,
            'string.empty': `"userId" cannot be an empty field`,
            'string.min': `"userId" cannot be an less than 12`,
            'any.required': `"userId" is a required field`
          }),
        
    });
    validateRequest(req, next, schema);
}

function loginSchema(req, res, next) {
    const schema = Joi.object({
        
        email: Joi.string().email().required().messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.empty': `"email" cannot be an empty field`,
            'string.email':`"email" is not valid`,
            'any.required': `"email" is a required field`
          }),
        password: Joi.string().min(6).required().messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.empty': `"password" cannot be an empty field`,
           
            'any.required': `"password" is a required field`
          }),
    });
    validateRequest(req, next, schema,1);
}


function validateRequest(req, next, schema,flag=0) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    if(flag){
        var { error, value } = schema.validate(req.body, options);
    }
    else{
        var { error, value } = schema.validate(req.params, options); 
    }
    
     if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    } 
}


module.exports = {
    wishListSchema,
    fetchWishListSchema,
    loginSchema
}