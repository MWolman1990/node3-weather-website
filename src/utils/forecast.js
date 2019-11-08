const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/07612faa0098a946429294417f5f4144/' + lat + ',' + long
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Failed to connect to weather services.')
        } else if (body.error) {
            callback('Invalid coordinates. Please try again.')
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                chanceToRain: body.currently.precipProbability*100,
                typeOfPrecip: body.currently.precipType,
                summary: body.daily.data[0].summary
            })
        }
    })
}

module.exports = forecast