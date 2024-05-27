 const express = require('express');
 const courses = require('./routes/courses');
 const home = require('./routes/home');
 const log = require('./middleware/logger');
 const startupDebug = require('debug')('app:startup');
 const dbDebug = require('debug')('app:db');

 const config = require('config');
 const morgan = require('morgan');
 const log = require('./middleware/logger');
 const Joi = require('joi');
 const app = express();

 app.set('view engine', 'pug')
 app.set('views','./views')


 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(express.static('public'));
 app.use(log);
 app.use('/api/courses', courses);
 app.use('/', home)
 
startupDebug('Startup debugging.....');
dbDebug('db debugging.....');



 if(app.get('env')==='development'){
   app.use(morgan('tiny'));
   console.log('Morgan enabled....')
 }
 if(app.get('env')==='production'){
   app.use(morgan('tiny'));
   console.log('Production enabled....')
 }

console.log(`APP_NAME:${config.get('name')}`);
console.log(`MAIL:${config.get('mail.host')}`);
console.log(`PASSWORD:${config.get('mail.password')}`);


 const port = process.env.PORT || 3000
 app.listen(port, ()=>{console.log(`Listening on port ${port}...`)})