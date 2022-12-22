import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH-mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt() {
  return Math.floor(Math.random() * 9999);
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

export { getRandomArrayElement, getDate, isTimeStart, isTimeEnd, getRandomInt, getUppercase };
