const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMsg = document.querySelector('#errorMsg');
const forecastMsg = document.querySelector('#forecastMsg');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const locVar = search.value;
    errorMsg.textContent = 'Loading...'
    forecastMsg.textContent = ''
    fetch('http://localhost:3000/weather?address=' + locVar).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            errorMsg.textContent = data.error
        } else {
            errorMsg.textContent = ''
            forecastMsg.textContent = 'Right now, in ' + data.formatted_address + ', it is ' + data.weather_desc + 
            ', the temperature is ' + data.temperature + '°C' +
            ' and it feels like ' + data.feelslike + '°C';
        }
    });
});

    console.log(locVar)
})

