const express = require("express")

const apiRouter = express.Router()

const recipesRouter = require("./recipes")

const reviewsRouter = require("./reviews")

apiRouter.use("/recipes", recipesRouter)
apiRouter.use("/recipes", reviewsRouter)
apiRouter.use("/reviews", reviewsRouter)
module.exports = apiRouter