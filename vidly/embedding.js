const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[
    {
      type:authorSchema,
      required:true
    }
  ]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}


async function updateAuthor(courseId){
  const course = await Course.findById(courseId);
  course.author.name="Nana Mwangaza";
  const result = await course.save();
  console.log(result);
}

async function addAuthor(courseId, author){
  const course =await Course.findById(courseId);
  course.authors.push(author);
 const result = await course.save();
 console.log(result);
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  course.authors.pull(authorId); //removes author with the given authorId
  const result = await course.save();
  console.log(result);
}
async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', [new Author({ name: 'Mosh' }),new Author({ name: 'Nana' })]);

removeAuthor("6665a5dac154653e82f68b23", "66661028b90cde0731553e5d");

