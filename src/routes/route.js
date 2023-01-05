const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")
//Routes
router.post("/authors",authorController.createAuthor)   //create author
router.post("/blogs",middleware.authentication,blogController.createblog) //create Blog
router.get("/blogs",middleware.authentication,blogController.getblog) //get Blog
router.put("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.updateBlogData)  //update the blog
router.post("/login",authorController.loginAuthor)  //Author login API
router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.deleteByParams) //Delete blog data by path params
router.delete("/blogs",middleware.authentication,blogController.deleteByQuery) //Delete blog data by query params

module.exports=router