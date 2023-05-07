const { PORT } = require('./config/config.js');
const express = require('express');
const app = express();
const cors = require('cors');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//routes
app.use(require('./routes/index'));

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
