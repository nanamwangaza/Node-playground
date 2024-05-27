
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises")
.then(()=> console.log("Connected to mongodb....."))
.catch(err=>console.log("Error", err.message));


const courseSchema = mongoose.Schema({
    name:String,
    author:String,
    isPublished:Boolean,
    tags:[String],
    price:Number,
    date:{type:Date, default:Date.now()}
    
});

const Course = new mongoose.model("Course", courseSchema);

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


 
 async function updateCourse(id){
    const course = await Course.findById(id);
    course.author="Nana";
    
    console.log(course);
   
 }

 updateCourse('5a68fdd7bee8ea64649c2777')

// async function removeCourse(id){
//   const result =  await Course.find({_id:id})
//   console.log(result);
// }
// removeCourse('5a68fdc3615eda645bc6bdec')

