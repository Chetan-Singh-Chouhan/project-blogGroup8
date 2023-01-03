const express = require('express');
const router = express.Router();
const { Router } = require('express')
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")
router.post("/createAuthor", authorController.createAuthor)
router.post("/createblog",blogController.createblog)
router.get("/getBlogs",blogController.getblog)
router.delete("/blogs/:blogId",blogController.isdeletebyId)


  
module.exports=router