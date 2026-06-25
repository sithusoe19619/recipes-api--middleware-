let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6 ;

const express = require("express")
const app = express()
const PORT = 8080

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

function ownMiddleware(req,res,next){
  console.log(req.method, req.originalUrl)
  next()
}
app.use(ownMiddleware)

function exampleMiddleware(req, res, next) {
  console.log("a request came in");
  next();
}
app.use(exampleMiddleware)

app.get("/", (req, res) => {
  res.json("Recipe API is running!")
})

app.get("/api/recipes", (req,res) => {
  res.json(recipes)
})

app.get("/api/recipes/:id", (req, res) => {
  const id = Number(req.params.id)

  const singleRecipe = recipes.find((recipe) => {
    return recipe.id === id
  })

  if (singleRecipe){
    res.json(singleRecipe)
  } else {
    res.status(404).json("Recipe not found!")
  }
})

app.post("/api/recipes", (req,res) => {
  // const title = req.body.title
  // const cuisine = req.body.cuisine
  // const minutes = req.body.minutes
  // const servings = req.body.servings
  // const vegetarian = req.body.vegetarian

  const newRecipe = {
    id: nextId,
    title: req.body.title,
    cuisine: req.body.cuisine,
    minutes: req.body.minutes, 
    servings: req.body.servings, 
    vegetarian: req.body.vegetarian 
  }

  nextId = nextId + 1 

  recipes.push(newRecipe)

  res.sendStatus(201)
})

app.patch("/api/recipes/:id", (req, res) => {
  const id = Number(req.params.id)

  const singleRecipe = recipes.find((singleRecipe) => {
    return singleRecipe.id === id
  })

  if (singleRecipe) {
    Object.assign(singleRecipe, req.body)
    res.status(200).json(singleRecipe)
  }
  else {
    res.status(404).json({error: "Recipe not found!"})
  }
})

app.delete("/api/recipes/:id", (req, res) =>{
  const id = Number(req.params.id)

  const recipeIndex = recipes.findIndex((recipe) => {
    return recipe.id === id
  })

  if (recipeIndex !== 0) {
    recipes.splice(recipeIndex, 1)
    res.sendStatus(204)
  }
  else {
    res.status(404).json({error: "Recipe not found!"})
  }
})