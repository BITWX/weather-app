const createErrorMessage = (message) => {
    return `<div class="error-message">${message}</div>`;
}

const createTitleElement = (name, country) => {
    return `<h1 class="nameTitle">${name}</h1><h3 class="nameSubtitle">${country}</h3>`;
}

const createCardElement = (forecast) => {
    return (//html
        `
	<div class="wrapper">
		<div class="card">
			<div class="card-image card-image-sky">
				<img src="${forecast.icon}" alt="${forecast.condition}">
				<div class="card-date">${forecast.date}</div>
			</div>
			<div class="card-time">${forecast.temperature}°</div>
			<div class="card-description">${forecast.condition}</div>
			<div class="card-stats">
            	<div class="one-third">
					<div class="stat">${forecast.humidity}<sup>%</sup></div>
					<div class="stat-value">Humedad</div>
				</div>

            	<div class="one-third">
					<div class="stat">${forecast.pressure}<sup>In</sup></div>
					<div class="stat-value">Presión</div>
				</div>

            	<div class="one-third no-border">
					<div class="stat">${forecast.windKPH}<sup>k/h</sup></div>
					<div class="stat-value">Viento</div>
				</div>
        	</div>
		</div>
	</div>
	`);
}

export { createErrorMessage, createTitleElement, createCardElement};