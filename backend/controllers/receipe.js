const Recipes = require("../models/recipe")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.fieldname
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async (req,res) => {
    const receipes = await Recipes.find();
    return res.json(receipes)
}

const getRecipe = async (req,res) => {
    const receipe = await Recipes.findById(req.params.id);
    return res.json(receipe)
}

const addRecipe = async (req,res) => {
    console.log(req.user)
    console.log(req.body)
    const {title,ingredients,instructions,time} = req.body;
    if(!title || !ingredients || !instructions){
        res.json({messge:"Required fields can't empty"})
    }
    const newRecipe = await Recipes.create({
        title,ingredients,instructions,time,coverImage:req.file.filename,
        createdBy:req.user.id
    })
    return res.json(newRecipe)
}

const editRecipe = async (req,res) => {
    console.log("body", req.body)
    const {title,ingredients,instructions,time} = req.body;
    if(!title || !ingredients || !instructions){
        res.json({messge:"Required fields can't empty"})
    }
    const receipe = await Recipes.findById(req.params.id);
    try {
        if(receipe){
            await Recipes.findByIdAndUpdate(
                req.params.id,
                {title,ingredients,instructions,time,coverImage:req.file.filename,createdBy:req.user.id},
                {new:true}
            )
            return res.json(receipe)
        }
        
    } catch (error) {
        return res.status(404).json({messge:"Error!"})
    }
}

const deleteRecipe = async (req,res) => {
    try {
        console.log("controller",req.params.id)
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    } catch (error) {
        return res.status(404).json({messge:"Error!"})
    }
    res.json({message: "delete router runing"})
}

module.exports={getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload}