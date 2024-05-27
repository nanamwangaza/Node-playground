const express = require('express');
const router = express.Router()

const courses = [
    {"id":1, "name":"course1"},
    {"id":2, "name":"course2"},
    {"id":3, "name":"course3"}
 ]
  function validateCourse(course){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    });
   return schema.validate(course)
  }




 router.get('/', (req, res)=>{
 res.send(courses)
 })

 router.get('/:id', (req, res)=>{
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Course with this id not found')
  res.send(course)
 })

 router.post('/', (req,res)=>{
    const schema = Joi.object(
        {
        name:Joi.string().min(3).required()
         }
    )
     
   const {error, value} = schema.validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)
   
    const course = {
        id:courses.length +1,
        name:req.body.name
    }
    courses.push(course)
 })

 router.put('/:id',(req, res)=>{
    const course = courses.find(course=> course.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found')
   
      const{error, value} = validateCourse(req.body)
      if(error) return res.status(400).send(error.details[0].message)

      course.name = value.name
      res.send(course)
 })

 router.delete('/:id',(req, res)=>{
   const course = courses.find(course=> course.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('Course not found')

   const index = courses.indexOf(course);
   courses.splice(index, 1)
   return res.send(course)

 })

 module.exports = router;
