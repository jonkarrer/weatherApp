let endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';

const weatherArr = [];
const temprature = document.getElementById('number');
const situation = document.getElementById('situation');
const time = document.getElementById('time');
const searchBar = document.getElementById('location');
const localTimeZone = new Date();
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
searchBar.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     updateCityLocation();
    };
});
function updateCityLocation() {
    const apiCity = searchBar.value;
    const apiKey = '&APPID=f0fda7206d1601a5d39960d1c3c15600';
    let newpoint = `${endpoint}${apiCity}${apiKey}`;
    fetch(newpoint)
        .then(response => response.json())
        .then(data => {
            let description = data.weather[0].description;
            situation.innerText = 
            description.charAt(0).toUpperCase() +
            description.slice(1, description.length);

            let temp = data.main.temp;
            let degreeF = (temp - 273.15) * 9/5 + 32;
            temprature.innerText = Math.floor(degreeF);

            let currentHours = localTimeZone.getHours();
            let currentMin = localTimeZone.getMinutes();
            if(currentMin < 10){
                currentMin = '0' + currentMin;
            };
            let localZone = localTimeZone.getTimezoneOffset()/-60;
            let targetZone = data.timezone/3600;
            let timeDiff = targetZone - localZone;
            let newTime = currentHours + timeDiff;
            let displayedTime;
            if(newTime > 12 && newTime < 24) {
                newTime -= 12;
                displayedTime = newTime.toString() + ':' + currentMin.toString();
                time.innerText = displayedTime + 'pm';
                if(newTime > 6){
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                }else{
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                };
            }else if (newTime > 24){
                newTime -= 24;
                if(newTime > 6 && newTime < 17){
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                };
                if(newTime < 6){
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                };
                if(newTime > 12 && newTime < 24) {
                    newTime -= 12;
                    displayedTime = newTime.toString() + ':' + currentMin.toString();
                    time.innerText = displayedTime + 'pm';
                    if(newTime > 6){
                        sun.style.display = 'block';
                        moon.style.display = 'none';
                    }else{
                        sun.style.display = 'block';
                        moon.style.display = 'none';
                    };
                }else{
                    displayedTime = newTime.toString() + ':' + currentMin.toString();
                    time.innerText = displayedTime + 'am';
                    if(newTime < 7){
                        sun.style.display = 'none';
                        moon.style.display = 'block';
                    }else{
                        sun.style.display = 'block';
                        moon.style.display = 'none'; 
                    };
                };
            }else{
                displayedTime = newTime.toString() + ':' + currentMin.toString();
                time.innerText = displayedTime + 'am';
                if(newTime < 7){
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                }else{
                    sun.style.display = 'block';
                    moon.style.display = 'none'; 
                };
            };   
        });
};
