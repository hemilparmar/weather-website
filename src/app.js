const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname) 
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')

//when you want to change views folder name
// Option2
 const viewsPath = path.join(__dirname, '/templates/views') // here you can change views folder name
 const partialsPath = path.join(__dirname,'/templates/partials') 




 //set the view engine for express.js using set method
app.set('view engine','hbs');
// Option 2// 
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Hemil 1'
    })
})

app.get('/about',(req,res)=>{
    res.render('About',{
        title:'About me',
        name:'Hemil 2'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help Page',
        helpText:'This is helpful',
        name:'Hemil 3'

    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Express.JS</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'Hemil',
//         age:20
//     },{
//         name:'Robert Downey Jr.',
//         age:55
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<title>This is About Page</title><h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an adderess'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            // if(error){
            //     return res.send({error})
            // }
            res.send({
                forecastData,
                location,
                address:req.query.address,
                latitude,
                longitude
                
            })
        })
    })
    
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    // res.send('Help article not found')
    res.render('404',{
        title:'404',
        name:'Hemil',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    // res.send('404 Error')
    res.render('404',{
        title:'404',
        name:'Hemil',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port '+port)
})