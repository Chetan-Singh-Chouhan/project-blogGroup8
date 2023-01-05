const express = require('express');
const router = express.Router();
//const { Router } = require('express')
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")

router.post("/authors",authorController.createAuthor)
router.post("/blogs",middleware.authentication,middleware.authorization,blogController.createblog)
router.get("/blogs",middleware.authentication,middleware.authorization,blogController.getblog)

router.put("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.updateBlogData)
router.post("/login",authorController.loginAuthor)
router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.deleteByParams)
router.delete("/blogs",middleware.authentication,blogController.deleteByQuery)

module.exports=router