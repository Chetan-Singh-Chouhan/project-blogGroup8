<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { Router } = require('express')
=======
const router = require('express').Router()
>>>>>>> f8b4c82dd8aa250ba4897811b817a4540e7301fe
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")
router.post("/createAuthor", authorController.createAuthor)
<<<<<<< HEAD
router.post("/createblog",middleware.isValidAuthor,blogController.createblog)
router.get("/getBlogs",blogController.getblog)
router.get("/getBlogs/:author_id/:category",blogController.filter)

  
=======
router.post("/createblog",middleware.isValidAuthor, blogController.createblog)

>>>>>>> f8b4c82dd8aa250ba4897811b817a4540e7301fe
module.exports=router