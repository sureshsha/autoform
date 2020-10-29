const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT ||3000
const path = require('path')
const newsletter = require('./renewed')
const json2xls = require('json2xls');
const fs = require("fs");


const publicDirectivePath = path.join(__dirname, './public')
const templatePath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//Express view engine
app.set('view engine', 'hbs')   
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

//Static publish
app.use(express.static(publicDirectivePath))
app.use(json2xls.middleware);

app.get('', (req, res)=>{
    res.render('index', 
    {title: 'Automation'  
     })
})
 app.get('/formdata', (req, res) => {
    if(!req.query.address) {
        return res.send("Enter the url")
    }
    console.log(req.query.address)
    newsletter(req.query.address, (data) => {
        let arraydata = []
        arraydata.push(data)
        if(arraydata>4) {
        res.send("File ready")
    }
    })
 })




app.get('/test',function(req, res) {
    jsonArr = xlsData()
    res.xls('data.xlsx', jsonArr);
});

app.listen(port, ()=>{
    console.log("Development server running on port", port)
})