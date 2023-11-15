const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

async function getData(cityName) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=9eede34955db4eb6ac632556231311&q=${cityName}&aqi=yes`);

    if (!response.ok) {
        // Handle the case where the request to the API is not successful
        console.error(`Error fetching data. Status: ${response.status}`);
        return null; // or throw an error, depending on your requirements
    }

    const result = await response.json();

    if (result.error) {
        // Handle the case where the API indicates an error (e.g., invalid city name)
        console.error(`Error from API: ${result.error.message}`);
        return null; // or throw an error, depending on your requirements
    }

    return result;
}

button.addEventListener("click", async () => {
    const value = input.value;
    const result = await getData(value);

    if (result) {
        cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        cityTime.innerText = result.location.localtime;
        cityTemp.innerText = result.current.temp_c+" °C";
    } else {
        // Handle the case where the city name is invalid
        
        alert("Invalid city name")
        cityName.innerText = "Invalid city name";
        cityTime.innerText = "";
        cityTemp.innerText = "";
    }
});



//