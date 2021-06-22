const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpdmFtMzAyNiIsImEiOiJja3E1YXh1MjEwOWQzMm5xb3JsamF0OWc0In0.oLSvwvBkhOvPBR93gNpRFQ&limit=1'
    request({url,json:true},(error,{body})=>{
        
        if(error)
        {
            callback('unable to connect to internet',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
  
        }
    }) 
}
module.exports=geocode