const router = require('express').Router()
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")


router.post("/createAuthor", authorController.createAuthor)
router.post("/createblog",middleware.isValidAuthor, blogController.createblog)

module.exports=router