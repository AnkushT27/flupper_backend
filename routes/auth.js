const express = require('express');
const routes = express.Router();
const auth = require('../controller/auth');
const {loginSchema} = require('../util/schemeValidation');

routes.post('/login',loginSchema,auth.login)

module.exports = routes

