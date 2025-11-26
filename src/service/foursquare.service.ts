import dotenv from "dotenv";
dotenv.config({ path:'/Users/shortscouture/Documents/js/restaurant-finder/.env'});
import axios from "axios";
import {z} from "zod";
import {event} from './openai.service'
interface Config {
  nodeEnv: string;    
  fourSquareAPI: string; 
  instance: string;
};

const apiKey = process.env.fourSquareAPI;
const llm =  event;
const tokenKey = process.env.code;
 //for logging
// env config
const options = { //options with parameters 
  method: 'GET',
  url:'https://places-api.foursquare.com/places/search',
 params: {
    query: llm.query,
    relevance:llm.relevance,
    near:llm.near,
  },
  headers: {
    'X-Access-Token': tokenKey, //validation input
    accept: 'application/json',
    'X-Places-Api-Version': '2025-06-17',
    Authorization: apiKey,
  }
};

function cleanOptions(options) {
  return{
    ...options,
    headers: {
      ...options.headers,
      Authorization: 'hidden',
    }
  }
}


export async function fetchData() {
  try{
  const fetch = await axios.request(options);
  console.log(cleanOptions)
  return fetch  } catch(err) {
  console.error('Error response:', err.fetch?.data || err.message);
 }
}