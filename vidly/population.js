const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Author' //means that it references the Author class(collection)
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name-_id') // "author" brings the whole author object, when we add 'name' means that we only want to include the name property, '-_means we exclude the _id property'
    .select('name author');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '6664120748c5dbc59f8a8868')

 listCourses();