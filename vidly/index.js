const express = require('express');
const config = require('config');
const app = express();
const genres = require('./routes/genres');



app.use(express.json());
app.use('/api/genres', genres);



console.log(`APP:${app.get('env')}`)
console.log(`NODE_ENV:${process.env.NODE_ENV}`)
console.log(`APP_NAME:${config.get('name')}`)
console.log(`MAIL:${config.get('mail.host')}`)
console.log(`PASSWORD:${config.get('mail.password')}`)


const port = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});