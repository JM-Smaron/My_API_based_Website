function start() {
    const searchTerm = document.getElementById("searchBox").value;
    const url = `https://restcountries.com/v3.1/name/${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => process(data))
        .catch(err => alert("Country not found!"));
}

function process(data) {
    const display = document.getElementById("displayArea");
    display.textContent = "";

    data.forEach(country => {
        const div = document.createElement("div");
        div.classList.add("countryCard");

        const countryName = country.name.common;
        const capital = country.capital ? country.capital[0] : "N/A";

        div.innerHTML = `
            <h2>${countryName}</h2>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <img src="${country.flags.png}" alt="Flag of ${countryName}">
            <button onclick="getWeather('${countryName}', this)">More Details</button>
            <div class="details"></div>
        `;

        display.appendChild(div);
    });
}

const weatherApiKey = "1e57f5a139cc2aa96d25c426ad0731ac";

function getWeather(countryName, btn) {
    const weatherUrl = `https://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${countryName}`;

    fetch(weatherUrl)
        .then(res => res.json())
        .then(weather => {
            const detailsDiv = btn.nextElementSibling;

            if (!weather.current) {
                detailsDiv.innerHTML = `<p>Weather info not available</p>`;
                return;
            }

            detailsDiv.innerHTML = `
                <p><strong>Temperature:</strong> ${weather.current.temperature}°C</p>
                <p><strong>Weather:</strong> ${weather.current.weather_descriptions[0]}</p>
                <p><strong>Humidity:</strong> ${weather.current.humidity}%</p>
                <p><strong>Wind:</strong> ${weather.current.wind_speed} km/h</p>
                <p><strong>Air Quality Index:</strong> ${weather.current.air_quality?.["us-epa-index"] ?? 'N/A'}</p>
            `;
        })
        .catch(err => alert("Weather info not available."));
}