import { event } from './service/openai.service'
import { fetchData } from './service/foursquare.service'
import express  from 'express'
//import { apiRequest } from './service/api.service.ts';
const app = express()

const restaurantResult = event;

app.get('/api', async (req, res,next) => { 
  try {  
  const result = await restaurantResult;
  const getRequest = await fetchData(); 
  console.log(JSON.stringify(getRequest.data.results[0],null,1));
  res.json(getRequest.data.results[0]); } //access first object only
  catch (err) { 
  console.error('error!', err.message); }
  });


app.use((req,res,next) => {
  res.setTimeout(60000);
  next();
});

app.use('/static',express.static('index'))

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message })
});

export default app;

