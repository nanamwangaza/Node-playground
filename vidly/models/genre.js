const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    }
})
const Genre = mongoose.model("Genre",genreSchema);


function validateGenre(genre){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
  return  schema.validate(genre);
}

exports.Genre = Genre;
exports.validate= validateGenre; //  validate is the variable we'll use in other pages to reference validateGenre
exports.genreSchema=genreSchema;