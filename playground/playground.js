
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises")
   .then(() => console.log("Connected to mongodb....."))
   .catch(err => console.log("Error", err.message));


const courseSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      lowercase:true,
      // match: /pattern/... u pass a regex to match the name
   },

   category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "AI"] // here if u put category:"-" or anything not in the enum u will get an error
   },

   author: String,
   isPublished: Boolean,
   tags:{
      type:Array,

      validate:{
         validator:function(v){
            return v && v.length > 0 //tags only valid if theres a value and the length > 0
           },
           message:"There must be atleast one tag"
      }
   },
   price: {
      type: Number,
      required: function () { return this.isPublished; },
      min:10,
      max:200,
      get:v=>Math.round(v), // rounds off the value we GET from the db
      set:v=>Math.round(v)
   }, // price is only required if the course is published(ie. if isPublished:true)
   date: { type: Date, default: Date.now() }

});

const Course = new mongoose.model("Course", courseSchema);


async function createCourse() {
   const course = new Course({
      name: "Flutter for beginners",
      author: "Nana",
      price:16.7,
      isPublished: false,
      category: "web",
      tags:["Dart", "Mobile"],
   })
   try {
      const result = await course.save();
      console.log(result)
      await course.validate()
   } catch (ex) {
      for(field in ex.errors){
         console.log(ex.errors[field].message);// this gives specific error messages, eg. special for tags, name, etc
      }
   }

}

createCourse()

async function getCourses() {
   const courses = await Course
      // .find({
      //     name: /.*js*./,
      //     author: /^Nana/
      // })
      // .find({price:10})..price is 10
      // .find({price:{$gt:10, $lt:20}})....price btn 10 and 20
      //find({price: {$in: [10,15,20]}})....price is either 10, 15 or 20
      .find({ isPublished: true })
      .or([
         { price: { $gte: 15 } },
         { name: /.*by.*/i }
      ])

   console.log(courses)
}




