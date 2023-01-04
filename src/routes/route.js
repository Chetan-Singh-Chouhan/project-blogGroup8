const express = require('express');
const router = express.Router();
//const { Router } = require('express')
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")

router.post("/createAuthor", authorController.createAuthor)
router.post("/createblog",middleware.isValidAuthor,blogController.createblog)
router.get("/getBlogs",middleware.isValidAuthor,blogController.getblog)
router.delete("/blogs/:blogId",blogController.deleteByParams)
router.delete("/blogs",blogController.deletebyquery)
router.put("/blogs/:blogId",blogController.updateBlogData)

module.exports=router