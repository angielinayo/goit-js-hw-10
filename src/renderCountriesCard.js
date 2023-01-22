export const renderCard = ({ name, flags, capital, population, languages }) => {
  return `<div class="country-item">
	<img class="country-flag" src=${flags.svg} alt="Flag of country" width="40"/>
	<h2 class="country-name">${name.official}</h2>
	</div>
	<ul>
	<li class="country-info-item"><span class="title">Capital:</span> ${capital}</li>
	<li class="country-info-item"><span class="title">Population:</span> ${population}</li>
	<li class="country-info-item"><span class="title">Languages:</span> ${Object.values(
    languages
  )}</li>
	</ul>
	`;
};
