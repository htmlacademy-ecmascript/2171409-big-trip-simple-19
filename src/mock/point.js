import { nanoid } from 'nanoid';
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
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Amsterdam parliament building'
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Amsterdam parliament building'
      }, {
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
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Geneva parliament building'
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Geneva parliament building'
      }, {
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
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Chamonix parliament building'
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Chamonix parliament building'
      }, {
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
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Saint-Petersburg parliament building'
      }, {
        'src': `http://picsum.photos/300/200?r=${getRandomInt(9999)}`,
        'description': 'Saint-Petersburg parliament building'
      }, {
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
    word: 'order',
    price: 20,
    active: false
  }, {
    id: 2,
    title: 'Add luggage',
    word: 'luggage',
    price: 50,
    active: false
  }, {
    id: 3,
    title: 'Switch to comfort',
    word: 'comfort',
    price: 80,
    active: false
  }, {
    id: 4,
    title: 'Add breakfast',
    word: 'breakfast',
    price: 50,
    active: false
  }, {
    id: 5,
    title: 'Choose seats',
    word: 'seats',
    price: 5,
    active: false
  }, {
    id: 6,
    title: 'Travel by train',
    word: 'train',
    price: 40,
    active: false
  }, {
    id: 7,
    title: 'Add meal',
    word: 'meal',
    price: 15,
    active: false
  }
];

const offersByTypeList = [
  {
    type: 'taxi',
    offers: [0, 1, 2, 3]
  },
  {
    type: 'bus',
    offers: [0, 1, 2]
  },
  {
    type: 'train',
    offers: [2, 3]
  },
  {
    type: 'ship',
    offers: [3, 4]
  },
  {
    type: 'drive',
    offers: [1, 4]
  },
  {
    type: 'flight',
    offers: [2, 4]
  },
  {
    type: 'check-in',
    offers: [0, 4]
  },
  {
    type: 'sightseeing',
    offers: [0, 1, 3]
  },
  {
    type: 'restaurant',
    offers: [0, 1, 2, 3, 4]
  },
];

const pointsList = [
  {
    basePrice: 20,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T11:00',
    destination: getRandomArrayElement(destinationsList),
    offers: [offersList],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 160,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: getRandomArrayElement(destinationsList),
    offers: [offersList],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 600,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: getRandomArrayElement(destinationsList),
    offers: [offersList],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 20,
    dateFrom: '2019-03-19T10:00',
    dateTo: '2019-03-19T11:00',
    destination: getRandomArrayElement(destinationsList),
    offers: [offersList],
    type: getRandomArrayElement(typesList),
  }, {
    basePrice: 20,
    dateFrom: '2019-03-19T18:00',
    dateTo: '2019-03-19T19:00',
    destination: getRandomArrayElement(destinationsList),
    offers: [offersList],
    type: getRandomArrayElement(typesList),
  },
];

const findDestination = (city) => destinationsList.find((destination) => destination.title === city);

// const allDest = () => destinationsList.map((city)=> city.title)

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(pointsList)
  };
}

export { getRandomPoint, typesList, destinationsList, offersList, offersByTypeList, findDestination };
