/** @format */

const request = require("request");

function geocode(address, callback) {
  if (address) {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiYW53YWFyOTciLCJhIjoiY2trcDhvbTN4MDdmOTJxcW4xamRjdWRpayJ9.30NzZb0YzGNJ7bxlb5WMQA&limit=1`;
    request({ url: geocodeURL, json: true }, (err, { body } = {}) => {
      if (err) {
        callback("Unable to connect to geocode", null);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another address", null);
      } else {
        console.log("body",body)
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const location = body.features[0].place_name;
        callback(null, {
          latitude,
          longitude,
          location,
        });
      }
    });
  } else {
    console.log("Address Required");
  }
}

module.exports = geocode;
