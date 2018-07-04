// listings of name of collections in FB

import axios from 'axios';

// need constants because need firebase url

import constants from '../constants';

const getRequest = () => {
  return new Promise ((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/listings.json`)
      .then((results) => {
        const listings = [];
        if (results.data !== null) {
          Object.keys(results.data).forEach((key) => {
            results.data[key].id = key;
            listings.push(results.data[key]);
          });
        }
        resolve(listings);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const postRequest = (listing) => {
  return new Promise((resolve, reject) => {
    axios
    .post(`${constants.firebaseConfig.databaseURL}/listings.json`, listing)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    })
  })
};

export default {getRequest, postRequest};
