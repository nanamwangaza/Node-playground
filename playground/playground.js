
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

 getCourses()
 
//  async function updateCourse(id){
//     const course = await Course.findById(id);
//     if(!course) return;
//     course.author="Another author";
//     course.isPublished=true;  
       
   
//     const result = await course.save();
//     console.log(result);
//  }

//  updateCourse('5a68fdd7bee8ea64649c2777');

