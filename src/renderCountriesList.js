export const renderList = ({ flags, name }) => {
  return `<li class="country-info-item">
	<img src="${flags.svg}" alt="Flag of country" class="country-flag" width="40"/>
        <p class="country-name">${name.official}</p>
				</li>`;
};
