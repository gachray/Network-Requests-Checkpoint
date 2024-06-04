const card = document.querySelector('.card');
const search = document.querySelector('.search button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', ()=> {
    
    const APIKey = "aa1b6058cad4bf689e2ad7c9b86ef41d";
    const city = document.querySelector('.search input').value;

    if(city == '')
        return ;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if (json.cod == '404') {
            card.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        card.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'sources/images/clear.png'
                break;
                
            case 'Rain':
                image.src = 'sources/images/rain.png'
                break;

            case 'Snow':
                image.src = 'sources/images/snow.png'
                break;

            case 'Clouds':
                image.src = 'sources/images/clouds.png'
                break;

            case 'Mist':
                image.src = 'sources/images/mist.png'
                break;
        
            case 'Haze':
                image.src = 'sources/images/mist.png'
                break;
            default:
                image.src = '/sources/images/clouds.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
    });
});