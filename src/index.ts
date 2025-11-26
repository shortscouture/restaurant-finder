import { response,event } from './service/openai.service.ts'
import { fetchData } from './service/foursquare.service.ts'
import express  from 'express'
//import { apiRequest } from './service/api.service.ts';
const app = express()

const restaurantResult = event;


/*app.get('/', async (req, res,next) => { 
  try {  
  const result = await response()} 
  catch (err) { 
  console.error('error!', err.message); }
  next();
  });*/

app.get('/', async (req, res,next) => { 
  try {  
  const result = await restaurantResult;
  const getRequest = await fetchData(); 
  console.log(JSON.stringify(getRequest.data.results[0], null, 2));}
  catch (err) { 
  console.error('error!', err.message); }
  });


app.use((req,res,next) => {
  res.setTimeout(60000);
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message })
});


app.listen(3000, () => {
  console.log(`app listening!`)
})

