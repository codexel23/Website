const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("SearchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    console.log(city);
});