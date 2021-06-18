import { getForecastLocation, createLocation } from "../services/weatherService.js";
import { createCardElement, createTitleElement, createErrorMessage } from "./components.js";

const searchForm = document.getElementById('searchForm');
const imgSearch = document.getElementsByClassName('image-container')[0];
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');

const initGeoLocalization = () => {
	navigator.geolocation.getCurrentPosition(findGeoLocalization, error);
}


const findGeoLocalization = async (position) => {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let data = await getForecastLocation(`${latitude},${longitude}`);
	let location = createLocation(data);
	showElement(imgSearch, false);
	fillTitleLocation(location);
	fillForecastCard(location.forecasts);
	createMapLocation(latitude, longitude);
}

const error = () => {
	showElement(imgSearch, true);
	showElement(loader, false);
}


let mapLocation = null;

const createMapLocation = (latitude, longitude) => {
	if (mapLocation && mapLocation.remove) {
		mapLocation.off();
		mapLocation.remove();
	}

	mapLocation = L.map('mapLocation').setView([latitude, longitude], 16);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mapLocation);
	const marker = L.marker([latitude, longitude]).addTo(mapLocation);
	marker.bindPopup("<b>¡Hola!</b><br>Aquí te encuentras.").openPopup();
	L.circle([latitude, longitude], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 25 })
		.addTo(mapLocation);
	showElement(loader, false);
}



searchForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	showElement(errorMessage, false);
	let query = searchForm.elements['query'].value;
	showElement(loader, true);
	showElement(imgSearch, false);
	try {
		let data = await getForecastLocation(query);
		let location = createLocation(data);
		fillTitleLocation(location);
		fillForecastCard(location.forecasts);
		createMapLocation(location.latitude, location.longitude);
	} catch (error) {
		errorMessage.innerHTML = createErrorMessage('No se encontró ninguna ubicación que coincida.');
		showElement(errorMessage,true);	
		showElement(loader, false);
	}
})


const showElement = (element, value) => {
	if (value)
		element.style.display = 'block'
	else
		element.style.display = 'none'
}


const fillForecastCard = (forecasts) => {
	const divCards = document.getElementById('location-cards');
	let cards = forecasts.map(forecast => {
		return createCardElement(forecast);
	});
	divCards.innerHTML = cards.join('\n')
}

const fillTitleLocation = (location) => {
	const divLoc = document.getElementById('location-container');
	divLoc.innerHTML = createTitleElement(location.name, location.country);
}


window.onload = initGeoLocalization