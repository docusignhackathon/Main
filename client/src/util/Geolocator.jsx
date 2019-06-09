require('dotenv').config();
const geolocator = require('geolocator');

const Geolocator = () => {
  geolocator.config({
    language: "en",
    google: {
      version: "3",
      key: process.env.GOOGLE_API_KEY
    }
  })
}

export default Geolocator;
