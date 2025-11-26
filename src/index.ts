import { response } from './service/openai.service.ts'
import { fetchData } from ''./service/foursquare.service.ts'
import express  from 'express'
const app = express()



app.get('/', async (req, res,next) => { 
  try {  
  const result = await response()} 
  catch (err) { 
  console.error('error!', err.message); }
  next();
  });

app.get('/', async (req, res,next) => { 
  try {  
  const result = await fetchData()
  next(); } 
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
