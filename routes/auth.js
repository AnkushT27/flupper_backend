const express = require('express');
const routes = express.Router();
const auth = require('../controller/auth');
const {loginSchema,fetchWishListSchema} = require('../util/schemeValidation');

routes.post('/login',loginSchema,auth.login)
routes.get('/userData/:userId',fetchWishListSchema,auth.getUserData)

module.exports = routes

