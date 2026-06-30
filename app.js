const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const PORT = 8080

const apiRouter = require("./api")

app.use(express.json())
app.use(morgan("dev"))

app.use(cors())

// function exampleMiddleware(req, res, next) {
//   console.log("a request came in");
//   next();
// }
// app.use(exampleMiddleware)

// function ownMiddleware(req,res,next){
//   console.log(req.method, req.originalUrl)
//   next()
// }
// app.use(ownMiddleware)

app.get("/", (req, res) => {
  try{
    res.json("Recipe API is running!")
  }
  catch(err){
    next(err)
  }
})

function errorHandler(err, req, res, next){
  console.error(err)
  res.sendStatus(500)
}
app.use("/api", apiRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
