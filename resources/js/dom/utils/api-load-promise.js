import goodOlAjax from './good-ol-ajax-promise';
import config from '../../../../config.env';

const api = config.api;

function getAllPlaces() {
  const promiseObj = new Promise((resolve, reject) => {
    const dbApi = `${api}/mapdata`;

    goodOlAjax(dbApi)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
  });

  return promiseObj;
}

function findCitiesByCountryCode(countryCode) {
  const promiseObj = new Promise((resolve, reject) => {
    getAllPlaces()
    .then((places) => {
      const arr = [];
      places.forEach((p) => {
        const thisPlace = p;

        if (thisPlace.city_id && thisPlace.country_code === countryCode) {
          arr.push(thisPlace);
        }
      });

      resolve(arr);
    })
    .catch((err) => {
      reject(err);
    });
  });

  return promiseObj;
}

function findPlaceByCoordinates(lat, lng) {
  const promiseObj = new Promise((resolve, reject) => {
    getAllPlaces()
    .then((places) => {
      let toSend = '';
      places.forEach((p) => {
        const thisPlace = p;
        const thisLatRound = Math.round(thisPlace.lat);
        const thisLngRound = Math.round(thisPlace.lng);
        const latRound = Math.round(lat);
        const lngRound = Math.round(lng);
        const latMax = latRound + 1;
        const lngMax = lngRound + 1;
        const latMin = latRound - 1;
        const lngMin = lngRound - 1;

        if (thisLatRound <= latMax && thisLatRound >= latMin
          && thisLngRound <= lngMax && thisLngRound >= lngMin) {
          toSend = thisPlace;
          return;
        }
      });

      resolve(toSend);
    })
    .catch((err) => {
      reject(err);
    });
  });

  return promiseObj;
}

export {
  getAllPlaces,
  findCitiesByCountryCode,
  findPlaceByCoordinates,
};
