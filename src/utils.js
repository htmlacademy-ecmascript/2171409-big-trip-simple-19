import dayjs from 'dayjs';
import { AMOUNT_ITEMS } from './const.js';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH-mm';
const DATE_FORMAT_FULL = 'DD/MM/YY';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt() {
  return Math.floor(Math.random() * 9999);
}

function getDateFull(dateFormat) {
  return dateFormat ? dayjs(dateFormat).format(DATE_FORMAT_FULL) : '';
}

function getDate(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
}

function isTimeStart(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
}
function isTimeEnd(dateTo) {
  return dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
}

function getUppercase(data) {
  return data.charAt(0).toUpperCase() + data.slice(1);
}

function getRandomPoints(data) {
  return Array.from({ length: AMOUNT_ITEMS }, data);
}

function findOffers(offersByType, typeOfPoint, offersList) {
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint);
  return foundOffersType ? offersList.filter((offer) => foundOffersType.offers.includes(offer.id)) : null;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

// Функция сопоставления выбранного пункта назначения
const getCheckedDestination = (point, destinations) => destinations.find((destination) => point.destination === destination.id);


export { getRandomArrayElement, updateItem, getDate, getDateFull, isTimeStart, isTimeEnd, getRandomInt, getUppercase, getRandomPoints, findOffers, getCheckedDestination };
