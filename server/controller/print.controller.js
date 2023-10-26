const express = require("express")
const {printAsPdf} = require("../Service/printService2")
const printRouter = express.Router()


printRouter.get("/", function(req,res){
    res.send("Hello from the print router")
})

printRouter.get("/:slug", async function(req,res){
    const {slug} = req.params
    const url = `http://localhost:3000/${slug}/print`
    try {
        await printAsPdf(url,slug)
        res.status(200).json({url: `http://localhost:5000/static/assets/exports/PDFExport_${slug}_new.pdf`}) 
    }catch(err){
        console.log(err)
        res.status(400).json({url: null, err})
        
    }
    
    
})

module.exports = printRouter