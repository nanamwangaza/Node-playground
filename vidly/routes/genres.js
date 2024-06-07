const express = require('express');
const router = express.Router()
const Joi = require('joi');
const mongoose = require('mongoose');



const genreSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    }
});

const Genre = mongoose.model("Genre", genreSchema);


function validateGenre(genre){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })

  return  schema.validate(genre);
}

router.post('/', async(req,res)=>{
  const  {error, value} = validateGenre(req.body);

  if(error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({name:req.body.name}) // here we let the genre
   genre =await genre.save();// then here we set the value to genre.save() so that after saving we get the genre as a response
   res.send(genre)
})


router.get('/', async(req,res)=>{
  const genres=await Genre.find().sort({name:1});
   res.send(genres);
})

router.get('/:id',async(req, res)=>{
    const genre =await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('genre not found')
    res.send(genre);
})

router.put("/:id",async(req,res)=>{
const {error}= validateGenre(req.body)
if(error) return res.status(400).send(error.details[0].message)
const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true}) // new returns the updated genre not the old one
    if(!genre) return res.status(404).send('genre not found');
    res.send(genre)
})

router.delete("/:id", async(req,res)=>{
const genre = await Genre.findByIdAndDelete(req.params.id);
 if(!genre) return res.status(404).send('genre not found')
  res.send(genre)
})

module.exports = router;