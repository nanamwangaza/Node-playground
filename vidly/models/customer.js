    const Joi=require('joi');
    const mongoose=require('mongoose'); 

    //created schema directly...( new mongoose.Schema({...) but we could also create a separate schema then place it like
    //const Customer =  mongoose.model("Customer", customerSchema)
 
    const Customer = mongoose.model("Customer", new mongoose.Schema({
    isGold:{
     type:Boolean,
     required:true,
     default:false
    },
 
    name:{
     type:String,
     required:true,
     minlength:3,
     maxlength:50
    },
 
    phone:{
    type:Number,
    required:true,
    min:5,
    max:50
    }
 }));

 function validateCustomer(customer){
    const schema = Joi.object({
        isGold:Joi.boolean(),
        name:Joi.string().min(3).max(50).required(),
        phone:Joi.number().min(5).max(50).required()
    })
     return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;