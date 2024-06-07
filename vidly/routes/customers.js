const {Customer, validate}= require('../models/customer'); // took these fromthe models folder
const express = require('express');
const router = express.Router();

  router.post("/", async(req, res)=>{
    const {error}= validate(req.body);
     if(error) res.status(400).send(error.details[0].message)
    let customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });
    customer=await customer.save();
    res.send(customer);    
});

router.get("/", async(req, res)=>{
   const customers = await Customer.find();
   res.send(customers)
});

router.get("/:id", async(req, res)=>{
const customer = await Customer.findById(req.params.id);
if(!customer) res.status(404).send("Course not found");
res.send(customer);
})

router.put("/:id", async(req, res)=>{
    const {error}= validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            isGold:req.body.isGold,
            name:req.body.name,
            phone:req.body.phone
        },
        {
            new:true
        }
    );
    if(!customer) res.status(404).send("Customer with the given ID not found");
    res.send(customer);
})

router.delete("/:id", async(req, res)=>{
const customer = await Customer.findByIdAndDelete(req.params.id);
if(!customer) res.status(404).send("Customer with the given ID is not found")
res.send(customer)
})


module.exports=router;