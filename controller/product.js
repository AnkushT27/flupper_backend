const ProductService = require('../services/product')
const User = require('../model/user')
const Product = require('../model/product')
exports.addOrRemoveWishlist = async (req,res,next)=>{
    let userId = req.body.userId;
    let productId = req.body.productId;
    let flag = req.body.flag;
    try{
        let info = await ProductService.wishlistUpdateService({userId,productId,flag});
        return res.status(201).json(info);
    }
    catch(e){
        next(e)
    }
}

exports.fetchWishList = async (req,res,next)=>{
    let userId = req.params.userId;
    
    try{
        let info = await ProductService.wishlistFetchService({userId});
        return res.status(200).json(info);
    }
    catch(e){
        next(e)
    }
}




