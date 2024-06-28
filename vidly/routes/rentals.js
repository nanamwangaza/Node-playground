const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const router = express.Router();
const {Customer}= require('../models/customer');
const {Movie} = require("../models/movie");
const {Rental, validateRental} = require("../models/rental");

Fawn.init("mongodb://localhost/vidly"); //initializing fawn
router.post("/", async(req, res)=>{
const {error} = validateRental(req.body);
if(error) res.status(400).send("Bad request");

const customer = await Customer.findById(req.body.customerId);
if(!customer) res.status(404).send("Customer not found");

const movie = await Movie.findById(req.body.movieId);
if(!movie) res.status(404).send("Movie not found");

if(movie.numberInStock ===0) return ("Movie not in stock");

let rental = await Rental({
    customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold
    },
    movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
    }
});

 try{
    new Fawn.Task()
    .save('rentals', rental) //rentals is the actual name of the collection
    .update('movies',
     {_id:movie._id},
     {$inc:{numberInStock:-1}}
   )
   .run();
   res.status(200).send(rental);
   console.log(rental);
} catch(ex){
  res.status(500).send("Something went wrong");
}
});

router.put("/:id", async(req,res)=>{
    const {error} = validateRental(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let rental = await Rental.findByIdAndUpdate(req.params.id);
    if(!rental)res.status(404).send("Rental not found");
    
    rental = new Rental({
    
})
})

router.delete("/:id", async(req,res)=>{
const rental= await Rental.findByIdAndDelete(req.params.id);
if(!rental) res.status(404).send("Rental not found");
console.log(rental);
res.status(200).send(rental);
})


module.exports = router;