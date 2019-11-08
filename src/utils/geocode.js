const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF0dGhld3dvbG1hbiIsImEiOiJjazFiNnl4MjIxOXZvM2R0YjUzOHlwd252In0.rP44z5j2bCpJ5f45NmwD0w&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Failed to connect to location services.')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode