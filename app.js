// app.js
const searchInput = document.querySelector('#search-input');
const countryList = document.querySelector('#country-list');
const countryInfo = document.querySelector('#country-info');

const debounce = _.debounce((search) => fetchCountries(search), 500);

searchInput.addEventListener('input', (event) => {
    debounce(event.target.value);
});

function fetchCountries(search) {
    fetch("https://restcountries.com/v2/name/${search}")
        .then(response => response.json())
        .then(data => {
            if (data.length > 10) {
                alert('Зробіть запит більш специфічним');
            } else if (data.length > 1) {
                renderCountryList(data);
            } else {
                renderCountryInfo(data[0]);
            }
        })
        .catch(error => console.log(error));
}

function renderCountryList(countries) {
    countryList.innerHTML = countries.map(country => <li>${country.name}</li>).join('');
}

function renderCountryInfo(country) {
    countryInfo.innerHTML = `
        <h2>${country.name}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${country.languages.map(language => language.name).join(', ')}</p>
        <img src="${country.flags[0]}" alt="Flag of ${country.name}" width="100">
    `;
}