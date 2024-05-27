const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(()=> console.log('Connected to mongodb...'))
  .catch(err => console.log('Error', err.message))

  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default:Date.now()},
    isPublished: Boolean
  })

 const Course = mongoose.model('Course', courseSchema);

 async function createCourse(){
    const course = new Course({
        name:'Angular js course',
        author:'Nana',
        tags:['angular','frontend'],
        isPublished:true
     })
     const result =  await course.save();
     console.log(result);
 }

 async function getCourses(){
    const courses = await Course
    // .find({
    //     name: /.*js*./,
    //     author: /^Nana/
    // })
    // .find({price:10})..price is 10
   // .find({price:{$gt:10, $lt:20}})....price btn 10 and 20
   //find({price: {$in: [10,15,20]}})....price is either 10, 15 or 20
 .find({isPublished:true})
 .or([
  {price:{$gte:15}},
  {name:/.*by.*/i}
 ])
 
    console.log(courses)
 }
 getCourses();