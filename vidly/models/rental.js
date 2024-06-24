const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = new mongoose.model("Rental", mongoose.Schema({
    customer:{
        type:mongoose.Schema({

            name:{
            type:String,
            required:true,
            minlength:3,
            maxlength:50
            },
            isGold:{
                type:Boolean,
                default:false,
            },
            phone:{
                type:String,
                required:true,
                maxlength:10
            }
        }),
        required:true
    },
    movie:{
        type:mongoose.Schema({

            title:{
            type:String,
            required:true,
            maxlength:50                
            },

            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:100
            }
        }),
        required:true
    },

     dateOut:{
        type:Date,
        required:true,
        default:Date.now
     },

     dateReturned:{
        type:Date,
     },

     rentalFee:{
        type:Number,
        min:0
     }
}));

   function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId:Joi.string().required()
        //here we only pt customer and movie id because the client doesnt set dateOut, dateReturned or rental fee. We can only get the customer's id and movie id from the client
    });
     return schema.validate(rental)
}

exports.Rental= Rental;
exports.validateRental= validateRental