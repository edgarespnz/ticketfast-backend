const express = require('express');
const app = express();
const cors = require('cors');


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


//routes
app.use(require('./routes/index'));


const PORT = 3001;
app.listen(3001);
console.log("server on port " +  PORT);
