const request=require('request')
const forecast=(latitude,longtitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=37ddca6a8ea4b7c6df09ae87407db38f&query='+ decodeURIComponent(latitude)+','+ decodeURIComponent(longtitude)+'&units=f'
request({ url,json:true},(error,{body})=>{
    if(error)
    {   callback('unable to connect to internet',undefined)
        
    }
    else{
        callback(undefined,(body.current.weather_descriptions[0]+' .It is currently '
        +body.current.temperature+' degree celcius But it feels like '+body.current.feelslike+' degree celcius out there'))
 
    }

})
}
module.exports=forecast