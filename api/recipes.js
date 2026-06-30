const express = require("express")

const miniRouter = express.Router()

let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6 ;

miniRouter.get("/", (req , res, next) => {
  try {
    res.json(recipes)
  }
  catch(err) {
    next(err)
  }
})

miniRouter.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const singleRecipe = recipes.find((recipe) => {
      return recipe.id === id
    })

    if (singleRecipe){
      return res.json(singleRecipe)
    } else {
      return res.status(404).json("Recipe not found!")
    }
  } catch(err) {
    next(err)
  }
})

function routeSpecificMiddleware(req, res, next){
  console.log("Validation middleward started")

  const body = req.body || {}
  const title = body.title
  const cuisine = body.cuisine

  if (!title || !cuisine) {
    console.log("2. Validation failed")
    return res.status(400).json( {
      error: "Title and cuisine are required"
    })
  }

  console.log("2. Validation passed")
  next()
}

miniRouter.post("/", routeSpecificMiddleware, (req,res, next) => {
  // const title = req.body.title
  // const cuisine = req.body.cuisine
  // const minutes = req.body.minutes
  // const servings = req.body.servings
  // const vegetarian = req.body.vegetarian

  try {
    console.log("POST route handler started")

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
  } catch(err) {
    next(err)
  }
})

miniRouter.patch("/:id", (req, res, next) => {
  try{
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
  } catch(err) {
    next(err)
  }
})

miniRouter.delete("/:id", (req, res , next) =>{
  try{
    const id = Number(req.params.id)

    const recipeIndex = recipes.findIndex((recipe) => {
      return recipe.id === id
    })

    if (recipeIndex !== -1) {
      recipes.splice(recipeIndex, 1)
      res.sendStatus(204)
    }
    else {
      res.status(404).json({error: "Recipe not found!"})
    }
  } catch(err) {
    next(err)
  }
}) 

module.exports = miniRouter

