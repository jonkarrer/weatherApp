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
    console.log(apiCity);
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
            let localZone = localTimeZone.getTimezoneOffset()/-60;
            let targetZone = data.timezone/3600;
            let timeDiff = targetZone - localZone;
            let newTime = currentHours + timeDiff;
            let displayedTime;
            if(newTime > 12 && newTime < 24) {
                newTime -= 12;
                displayedTime = newTime.toString() + ':' + currentMin.toString();
                return time.innerText = displayedTime + 'pm';
            }else if (newTime > 24){
                newTime -= 24;
                if(newTime > 12 && newTime < 24) {
                    newTime -= 12;
                    displayedTime = newTime.toString() + ':' + currentMin.toString();
                    return time.innerText = displayedTime + 'pm';
                }else{
                displayedTime = newTime.toString() + ':' + currentMin.toString();
                return time.innerText = displayedTime + 'am';
                };
            }else{
                displayedTime = newTime.toString() + ':' + currentMin.toString();
                return time.innerText = displayedTime + 'am';
            };
            
           
            
        });
};
console.log();
