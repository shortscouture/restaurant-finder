import dotenv from "dotenv";
dotenv.config({ path:'/Users/shortscouture/Documents/js/restaurant-finder/.env' });
const axios = require('axios');

interface Config {
  nodeEnv: string;    
  fourSquareAPI: string;
};
/*env config*/
const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  fourSquareAPI: process.env.FOURSQUARE_API,
}; 

const options = {
  method: 'GET',
  url:'https://places-api.foursquare.com/places/search',
  params: {
    'code': 'pioneerdevai'
  },
  headers: {
    accept: 'application/json',
    'X-Places-Api-Version': '2025-06-17',
    authorization: 'Bearer ${process.env.fourSquareAPI}'
  }
};

 export const fetchData = async(axiosReq, err) => {
  try {
    const axiosReq = await axios.request(options);
    return axiosReq.data; 
  } catch (err) {
    console.error('api error!', err.message)
  }
 }


