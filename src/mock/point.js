import { getRandomArrayElement, getRandomInt } from '../utils.js';

const destinationsList = [
  {
    id: 1,
    destination: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    title: 'Amsterdam',
    pictures: [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Amsterdam parliament building'
      }
    ]
  }, {
    id: 2,
    destination: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    title: 'Geneva',
    pictures: [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Geneva parliament building'
      }
    ]
  }, {
    id: 3,
    destination: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    title: 'Chamonix',
    pictures: [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Chamonix parliament building'
      }
    ]
  }, {
    id: 4,
    destination: 'Saint-Petersburg, is a beautiful city, a true asian pearl, with crowded streets.',
    title: 'Saint-Petersburg',
    pictures: [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Saint-Petersburg parliament building'
      }
    ]
  }
];

const typesList = [
  {
    id: 1,
    title: 'restaurant'
  }, {
    id: 2,
    title: 'bus'
  }, {
    id: 3,
    title: 'train'
  }, {
    id: 4,
    title: 'ship'
  }, {
    id: 5,
    title: 'drive'
  }, {
    id: 6,
    title: 'flight'
  }, {
    id: 7,
    title: 'check-in'
  }, {
    id: 8,
    title: 'sightseeing'
  }, {
    id: 9,
    title: 'taxi'
  }
];

const offersList = [
  {
    id: 1,
    title: 'Order Uber',
    price: 20
  }, {
    id: 2,
    title: 'Add luggage',
    price: 50
  }, {
    id: 3,
    title: 'Switch to comfort',
    price: 80
  }, {
    id: 4,
    title: 'Add breakfast',
    price: 50
  }, {
    id: 5,
    title: 'Switch to comfort',
    price: 100,
  },
];

const pointsList = [
  {
    basePrice: 20,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T11:00',
    destination: getRandomArrayElement(destinationsList),
    id: '1',
    offers: [getRandomArrayElement(offersList), getRandomArrayElement(offersList)],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 160,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: getRandomArrayElement(destinationsList),
    id: '2',
    offers: [getRandomArrayElement(offersList), getRandomArrayElement(offersList)],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 600,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: getRandomArrayElement(destinationsList),
    id: '3',
    offers: [getRandomArrayElement(offersList), getRandomArrayElement(offersList)],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 20,
    dateFrom: '2019-03-19T10:00',
    dateTo: '2019-03-19T11:00',
    destination: getRandomArrayElement(destinationsList),
    id: '4',
    offers: [getRandomArrayElement(offersList), getRandomArrayElement(offersList)],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 20,
    dateFrom: '2019-03-19T18:00',
    dateTo: '2019-03-19T19:00',
    destination: getRandomArrayElement(destinationsList),
    id: '5',
    offers: [getRandomArrayElement(offersList), getRandomArrayElement(offersList)],
    type: getRandomArrayElement(typesList),
  },
];

function getRandomPoint() {
  return getRandomArrayElement(pointsList);
}

export { getRandomPoint, typesList, destinationsList, offersList };
