const request = require('postman-request');

const geocode = (address, callback) =>{
    const maps_key = 'AIzaSyB3KdGjMyaZiOe8LM2vCF8x4UIFBUkSAb4';
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + maps_key;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Google location services', undefined)
        } else if (body.status == 'ZERO_RESULTS') {
            callback('The address was not found, please try another', undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
                formatted_address: body.results[0].formatted_address
            })
        }
    });
};

module.exports = geocode