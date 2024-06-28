const express = require("express");
const router = express.Router();
const {Movie, validateMovie} = require("../models/movie");
const {Genre} = require("../models/genre");


router.post("/",async(req, res)=>{
    const {error} = validateMovie(req.body);
    if(error) res.status(400).send("Bad request");

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) res.status(400).send("genre not found");

    let movie = await Movie({
        title:req.body.title,
        genre:{
         _id:genre._id,
         name:genre.name,
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });

     movie = await movie.save();
     console.log(movie);
     return res.status(201).send(movie);
});

router.get("/", async(req, res)=>{
const movies = await Movie.find()
.sort({title:1})
console.log(movies);
 res.status(200).send(movies);
});

router.get("/:id", async(req, res)=>{
    const movie = await Movie.findById(req.params.id);
   if(!movie) res.status(404).send("movie not found");

   console.log(movie);
   res.status(200).send(movie);
});

router.put("/:id", async(req, res)=>{
 const genre = await Genre.findById(req.body.genreId).select({name:1});
 if(!genre) res.status(404).send("genre not found");

 const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
    title:req.body.title,
    genre:genre,
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
 },
 {
    new:true
 });
 if(!updatedMovie) res.status(404).send("Movie not found")
 console.log(updatedMovie);
 res.status(200).send(updatedMovie);
});

router.delete("/:id", async(req,res)=>{
const movie = await Movie.findByIdAndDelete(req.params.id);
if(!movie) res.status(404).send("Movie not found");
console.log(movie);
res.status(200).send(movie);
});


module.exports = router;