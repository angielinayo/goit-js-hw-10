import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { renderList } from './renderCountriesList';
import { renderCard } from './renderCountriesCard';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

Notify.init({
  width: '400px',
  position: 'center-top',
});

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  let searchedCountry = event.target.value.trim();

  if (searchedCountry === '') {
    countriesList.innerHTML === '';
    countriesInfo.innerHTML === '';
    return;
  }

  fetchCountries(searchedCountry)
    .then(data => {
      const countriesListLength = data.length;

      if (countriesListLength > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (countriesListLength >= 2 && countriesListLength <= 10) {
        const renderedList = data
          .map(country => {
            return renderList(country);
          })
          .join('');
        countriesInfo.innerHTML = '';
        countriesList.innerHTML = renderedList;
      }

      if (countriesListLength === 1) {
        const renderedCountryCard = data
          .map(country => {
            return renderCard(country);
          })
          .join('');
        countriesList.innerHTML = '';
        countriesInfo.innerHTML = renderedCountryCard;
      }
    })
    .catch(error => {
      if (error.message === '404') {
        Notify.failure('Oops, there is no country with that name.');
        countriesList.innerHTML === '';
        countriesInfo.innerHTML === '';
      }
    });
}
