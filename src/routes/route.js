const express = require('express');
const router = express.Router();
const app = router


const authorController = require('../controller/authorController')
// const blogController = require("../controller/blogController")

///Author route handler
app.post("/author",authorController.createAuthor)