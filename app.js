const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const app = express();
const mongoose = require('mongoose')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({ origin: true}));



    

app.use('/auth',authRoute)
app.use('/product',productRoute);



app.use((err,req,res,next)=>{
    console.log(err ,err.statusCode)
    console.log('now is errrormiddl',err.statusCode)
    const status = err.statusCode || 500
    if(err){
        res.status(status).json({
            message:err.message || err
        })
    }
  });


  mongoose.connect('mongodb+srv://AnkushT27:test@cluster0.t3exm.mongodb.net/flupper_ecomm?retryWrites=true&w=majority',{ useNewUrlParser: true })
  .then((connected)=>{
      console.log(connected.connections)
      
      app.listen(3000)
    
  })
  .catch((err)=>{
      console.log(err)
      })


     