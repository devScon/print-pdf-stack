const express = require("express")
const userRouter = express.Router()

userRouter.get("/", function(req,res){
    res.send("Hello from the user router")
})

module.exports = userRouter