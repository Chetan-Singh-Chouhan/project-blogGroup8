<<<<<<< HEAD
=======
const { Router } = require('express')
const authorController = require('../controller/authorController')
const blogController = require("../controller/blogController")
const middleware = require("../middleware/middleware")


router.post("/createAuthor", authorController.createAuthor)
router.post("/createblog",middleware.isValidAuthor, blogController.createblog)
>>>>>>> fc290eede4b8ce3084d3566e3b4781f2dbadfe39
