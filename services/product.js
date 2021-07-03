const User = require('../model/user')
const Product = require('../model/product')
const mongoose = require('mongoose')
async function wishlistUpdateService({userId,productId,flag}){
    let user = await User.findById(userId)
    if(!user){
        throw new Error('User Not Found')
    }
    else{
        let index = user.wishlist.products.findIndex((p)=>p.productID==productId)
        if(index != -1 && flag == 0){
            user.wishlist.products.splice(index, 1)
            let {wishlist} = await user.save()
            return wishlist
        }
        else if (index != -1 && flag == 1){
            throw new Error('Product Already Wishlisted')
        }
        else if (index == -1 && flag == 0){
            throw new Error('Product Cannot Be Removed , Does not exist')
        }
        else{
            console.log(user,productId)
            user.wishlist.products.push({productID:productId})
            let {wishlist} = await user.save()
            return wishlist
        }
        
    }
}


async function wishlistFetchService({userId}){
    let user = await User.aggregate([
      {$match: {_id: mongoose.Types.ObjectId(userId)}},
        {$unwind:"$wishlist.products"},
    {$lookup: 
    {from: "product", localField: "wishlist.products.productID", foreignField: "_id", as: "wishListProducts"}},
    {$unwind:"$wishListProducts"},
    {$group:{
        "_id":"$_id",
        "email":{"$first":"$email"},
        "name":{"$first":"$name"},
        "wishListProducts":{"$push":"$wishListProducts"}
    }},
      
      
      ])
    if(!user){
        throw new Error('User Not Found')
    }
    else{
        return user
    }
    }
    

module.exports = {
    wishlistUpdateService,
    wishlistFetchService
}