const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose") ;
const Recipe = require("./models/Recipe.model")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extend:false })) ;


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes" , async (req , res) => {
    const 
    {title ,instruction ,level , ingredients ,image ,duration ,isArchived ,created} = req.body ;

    try {
        const newRecipe = await Recipe.create({title ,instruction ,level , ingredients ,image ,duration ,isArchived ,created}) ;

        res.status(200).json(newRecipe)
    }
    catch(error){
        console.log(error);
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes" , async (req , res) => {
    const 
    {title ,instruction ,level , ingredients ,image ,duration ,isArchived ,created} = req.body ;
    try {
        const allRecipes = await Recipe.find({title ,instruction ,level , ingredients ,image ,duration ,isArchived ,created})
        res.status(200).json(allRecipes)
    }
    catch(error){
        console.log(error)
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("recipes/:id", (req, res) => {

    Recipe.findById(req.params.id)
    .then((oneRecipe) => {
        res.status(200).json(oneRecipe)
    })
    .catch((error) => {
        res.status(500).json({ error: "Failed to get recipe" })
    })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
