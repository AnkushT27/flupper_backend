const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }//which admin user has added
})


module.exports = mongoose.model('Products',product)