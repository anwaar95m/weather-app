const request = require("request");


function forecast({ latitude, longitude } = {}, callback) {
  if (latitude && longitude) {
    const weatherstackURL = `http://api.weatherstack.com/current?access_key=55ff36c60831c207d1dcddb6524018f6&query=${latitude},${longitude}`;
    request({ url: weatherstackURL, json: true }, (err, { body }) => {
      if (err) {
        callback("Unable to connect to WeatherStack", null);
      } else if (body.error) {
        callback(
          "Unable to find weather information for given Latitude and Longitude",
          null
        );
      } else {
        const { current } = body;
        const { temperature, precip } = current;
        callback(null, {
          temperature,
          precip,
        });
      }
    });
  } else {
    console.log(`Latitude and Longitude are Required`);
  }
}


module.exports = forecast;
