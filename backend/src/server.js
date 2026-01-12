const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); //CROSS ORIGIN RESOURCE SHARING
require('dotenv').config();


//connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
 .then(() => console.log('connected to mongoDB'))
 .catch(err => console.log('error connecting to mongoDB:',err));


const app = express();
const PORT = process.env.port || 5000;
app.use(express.json());
app.use(cors());

//import and use space routes
const spaceRoutes = require('./routes/spaceRoutes');
app.use('/api/spaces',spaceRoutes);

app.get('/',(req,res) => {
  res.json({
    message : "Bckend server is running"
  });
});

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
})