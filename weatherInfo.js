console.log("weatherInfo.js loaded");

const daysContainer = document.querySelector(".daysContainer");
const detailContainer = document.querySelector(".detailContainer");
const detailDayName = document.querySelector(".detailDayName");
const detailIcon = document.querySelector(".detailIcon");
const detailTemp = document.querySelector(".detailTemp");
const detailHumidity = document.querySelector(".detailHumidity");
const detailWind = document.querySelector(".detailWind");
const backBtn = document.querySelector(".backBtn");

const API_KEY = '7cf74d09ad9e58cc512a9f2cf1099eb4';
const city = 'Dublin';

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

fetch(forecastUrl)
  .then(response => response.json())
  .then(forecastData => {
    console.log("Forecast Data:", forecastData);

    const list = forecastData.list;

    const daily = {};

    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!daily[date]) {
        daily[date] = [];
      }
      daily[date].push(item);
    });

    const days = Object.keys(daily).slice(0, 5);

    days.forEach((date, index) => {
      const temps = daily[date].map(item => item.main.temp);
      const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
      const weather = daily[date][0].weather[0];
      
      const dayBox = document.getElementById(`day${index}`);
      if (dayBox) {
        let label = '';
        if (index === 0) label = 'Today';
        else if (index === 1) label = 'Tomorrow';
        else {
            const d = new Date(date);
            label = d.toLocaleDateString('en-GB', { weekday: 'long'});
        }
        dayBox.querySelector('.dayName').textContent = label;
        dayBox.querySelector('.dayTemp').textContent = `${avgTemp}°C`;
        dayBox.querySelector('.dayIcon').src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        dayBox.querySelector('.dayIcon').alt = weather.description;

        dayBox.onclick = () => {
          detailDayName.textContent = label;
          detailIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
          detailIcon.alt = weather.description;
          detailTemp.textContent = `Average Temp: ${avgTemp}°C`;
          detailHumidity.textContent = `Humidity: ${daily[date][0].main.humidity}%`;
          detailWind.textContent = `Wind: ${daily[date][0].wind.speed} m/s`;

          daysContainer.style.display = "none";
          detailContainer.style.display = "block";
        };
      }
    });

    backBtn.onclick = () => {
      detailContainer.style.display = "none";
      daysContainer.style.display = "flex";
    };
  })
  .catch(error => console.error('Error:', error));

document.addEventListener('DOMContentLoaded', () => {
  const weather = document.querySelector('.weather');
  const weatherBox = document.querySelector('.weatherBox');
  const weatherTxt = document.querySelector('.weatherTxt');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        weatherBox.classList.add('show');
        setTimeout(() => {
          weatherTxt.classList.add('show');
        }, 1200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(weather);
});
