const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require("./genre")

 const Movie = new mongoose.model("Movie", mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre: {
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        required:true
    }
}));


   function validateMovie(movie){
    const schema = Joi.object({
        title:Joi.string().required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number(),
        dailyRentalRate:Joi.number()
    });
    return schema.validate(movie);
}


exports.Movie = Movie;
exports.validateMovie = validateMovie;

