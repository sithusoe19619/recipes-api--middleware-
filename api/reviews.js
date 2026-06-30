const express = require("express")

const reviewsRouter = express.Router()

let reviews = [
  { id: 1, recipeId: 1, reviewer: "Sam", rating: 5, comment: "Restaurant quality." },
  { id: 2, recipeId: 1, reviewer: "Priya", rating: 4, comment: "Good but a little salty." },
  { id: 3, recipeId: 2, reviewer: "Alex", rating: 5, comment: "My new go-to." },
];

let nextReviewId = 4;

reviewsRouter.get("/:recipeId/reviews", (req, res, next) => {
    try {
        const recipeId = Number(req.params.recipeId)

        const matchingReviews = reviews.filter((eachReview) => {
            return eachReview.recipeId === recipeId
        })

        res.json(matchingReviews)
    } catch(err) {
        next(err)
    }
})

reviewsRouter.post("/:recipeId/reviews" , (req,res,next) => {
    try {
        const recipeId = Number(req.params.recipeId)

        const rating = req.body.rating

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(400).json({error: "Rating must be a number between 1 and 5!"})
        }

        const newReview = {
            id : nextReviewId,
            recipeId : recipeId,
            reviewer : req.body.reviewer,
            rating : req.body.rating,
            comment : req.body.comment
        }

        nextReviewId += 1

        reviews.push(newReview)

        res.sendStatus(201)
    } catch(err) {
        next(err)
    }
})

reviewsRouter.delete("/:id", (req,res,next) => {
    try {
        const reviewId = Number(req.params.id)

        const reviewIndex = reviews.findIndex((review) => {
            return review.id === reviewId
        })

        if (reviewIndex !== -1) {
            reviews.splice(reviewIndex, 1)
            res.sendStatus(204)
        } else {
            res.status(404).json({error: "Review not found!"})
        }

    } catch(err) {
        next(err)
    }
})

module.exports = reviewsRouter