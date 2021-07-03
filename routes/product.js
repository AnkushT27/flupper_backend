

const express = require('express');
const routes = express.Router();
const product = require('../controller/product');
const tokenVerify = require('../util/tokenVerify');
const {wishListSchema,fetchWishListSchema} = require('../util/schemeValidation');
 

routes.put('/wishlist',tokenVerify,wishListSchema,product.addOrRemoveWishlist)
routes.get('/wishlist/:userId',tokenVerify,fetchWishListSchema,product.fetchWishList)


module.exports = routes

