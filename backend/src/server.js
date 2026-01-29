const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); //CROSS ORIGIN RESOURCE SHARING
require('dotenv').config();
const rateLimit = require('express-rate-limit');


//connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
 .then(() => console.log('connected to mongoDB'))
 .catch(err => console.log('error connecting to mongoDB:',err));


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

//rate limiting for lead submissions
const leadSubmissionLimiter = rateLimit({
  windowMs: 60*60*1000, //60 mins
  max: 3, //limit each IP to maximum 3 requests per windowMs
  message : 'Too many lead submissions, please try again later',
  standardHeaders: true,
  legacyHeaders : false
})

app.use('/api/leads', leadSubmissionLimiter);

//import and use space routes
const spaceRoutes = require('./routes/spaceRoutes');
app.use('/api/spaces',spaceRoutes);
//import and use lead routes
const leadRoutes = require('./routes/leadRoutes');
app.use('/api/leads' , leadRoutes);

app.get('/',(req,res) => {
  res.json({
    message : "Bckend server is running"
  });
});

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
})