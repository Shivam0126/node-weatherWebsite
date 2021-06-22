const path=require('path')
const express=require('express')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const hbs=require('hbs')
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather App',
        'name':'Shivam'


    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About me',
        'name':'Shivam Gupta'


    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Help',
          'name':'Shivam Gupta',
        'message':'This is a help page'


    })
})
app.get('/Weather',(req,res)=>{
    if(!req.query.address)
    {
      return res.send({
            'error':'You must provide an address'
        })
    }
    geocode(req.query.address ,(error,{latitude,longtitude,location}={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastData,
                location:location,
                //address:req.query.address
            })
           
        })
    
    })
   
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
      return res.send({
            'error':'You must provide a search query'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
          'title':'404',
          'name':'Shivam Gupta',
          'errorMessage':'Help article not found.'
      })

})
app.get('*',(req,res)=>{
      res.render('404',{
          'title':'404',
          'name':'Shivam Gupta',
          'errorMessage':'Page not found.'
      })
})
app.listen(3000,()=>{
    console.log('Server is Up on port 3000.')
})