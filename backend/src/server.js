const express = require('express');
const cors = require('cors'); //CROSS ORIGIN RESOURCE SHARING
require('dotenv').config();
const app = express();
const PORT = 5000;
app.use(express.json());