const express = require('express');
const cors = require('cors'); //CROSS ORIGIN RESOURCE SHARING
require('dotenv').config();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
  res.json({
    message : "Bckend server is running"
  });
});

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
})