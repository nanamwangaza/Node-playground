const express = require("express");
const router = express.Router();
const {Customer}= require('../models/customer');
const {Movie} = require("../models/movie");
const {Rental, validateRental} = require("../models/rental");


router.post("/", async(req, res)=>{
const {error} = validateRental(req.body);
if(error) res.status(400).send("Bad request");

const customer = await Customer.findById(req.body.customerId);
if(!customer) res.status(404).send("Customer not found");

const movie = await Movie.findById(req.body.movieId);
if(!movie) res.status(404).send("Movie not found");

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

const result = await rental.save();
console.log(result);
res.status(200).send(result);
})


module.exports = router;