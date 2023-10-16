const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine, views location and handlebars partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Steve Ross"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About the App",
        name: "Steve Ross"
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Knowledge Base",
        name: "Steve Ross",
        helpText: "Some useful help text"
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address'
        });
    }
    geocode(req.query.address, (error, maps_data) => {
        if (error != undefined) {
            return res.send({
                error: error
            });
        }
        forecast(maps_data,(error, weather_data) => {
            if (error != undefined) {
                return res.send({
                    error: error
                });
            }
            res.send({
                address: req.query.address,
                formatted_address: maps_data.formatted_address,
                weather_desc: weather_data.weather_desc,
                temperature: weather_data.temperature,
                feelslike: weather_data.feelslike
            });
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        notFound: "help article not found",
        title: "Knowledge Base"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        notFound: "The page you searched for does not exist",
        title: "404 page"
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});