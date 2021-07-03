const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const user = new Schema({
         name:{
        type:String,
        required:true
      
        },
        email:{
        type:String,
        required:true
      
        },
        password:{
            type:String,
            required:true
        },
        wishlist:{
            products:[{
                productID:{
                            type:Schema.Types.ObjectId,
                            ref:'Products',
                            required:true
                    }
            }]
            
    }   
        
})

module.exports = mongoose.model('User',user);