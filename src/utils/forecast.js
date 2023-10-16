const request = require('postman-request');

const forecast = (maps_data, callback) => {
    const query = maps_data.latitude + ',' + maps_data.longitude
    const weather_key = 'df6715d19659d74d69a8a0fef89a3ba9';
    const urlweather = 'http://api.weatherstack.com/current?access_key=' + weather_key + '&query=' + query + '&units=m';
    request({ url: urlweather, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.success == false) {
            callback("Something's gone wrong with the query.", undefined);
        } else {
            callback(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        }
    });
}

module.exports = forecast