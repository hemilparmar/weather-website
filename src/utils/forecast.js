const request = require('request')
const fs = require('fs')
const { url } = require('inspector');
const geocode =require('./geocode')
const forecast = (latitude, longitude, callback) => {

    const address = process.argv[2]

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        qs: {q: latitude, longitude, days: '3' },
        headers: {
            'x-rapidapi-key': '035c7f410dmshba5c7ff2987497fp1bdf07jsn6b7c9be35883',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            useQueryString: true
        },
        json: true
    };

    //   request(options, function (error, response, body) {
    request(options, function (error, { body }) {

        if (error) {
            callback('Unable to connect to weather service', undefined)
            // console.log(error)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                latitude:'Latitude is '+ latitude,
                longitude: 'Longitude is '+longitude,
                temperature_F: 'Temperature is ' + body.current.temp_f +' fahrenheit',
                location: 'Location is ' + body.location.name + ',' + body.location.region + ',' + body.location.country
                

            })
        }
    });


}

module.exports = forecast