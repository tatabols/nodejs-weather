const request = require('request');
const url = require('./apiKey');

const forecast = (query, callback) => {
  setTimeout(() => {
    request({ url: `${url}${query}`, json: true }, (error, { body }) => {
      if (error) {
        callback('Error connecting to web service', undefined);
      } else if (body.cod === '404') {
        callback(body.message, undefined);
      } else {
        const { temp, temp_min, temp_max } = body.list[0].main;
        callback(undefined, { temp, temp_min, temp_max });
      }
    });
  }, 1000);
};

module.exports = forecast;
