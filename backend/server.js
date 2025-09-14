const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const recipeRouter = require("./routers/recipe")
const userRouter = require("./routers/user")
const connectDB = require("./config/connectionDB");
const cors = require("cors")
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors())
app.use(express.static("public"))
app.use("/", userRouter);
app.use("/recipe", recipeRouter);

app.listen(PORT, (err) => {
    console.log(`runung port ${PORT}`)
})

