//import dotenv from "dotenv";
import { response } from './service/openai.service.ts'
import express  from 'express'


/*dotenv.config({ path:'/../.env' });

interface Config {
 // port: number
  nodeEnv: string;  
  openaiAPI: string;  
  //fourSquareAPI: string;
};
/*env config
const config: Config = {
  //port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  openaiAPI: process.env.OPENAI_API_KEY,
  //fourSquareAPI: process.env.FOURSQUARE_API,
}; */

const app = express()

app.get('/', async (req, res,next) => { 
  try {  
  const result = response()
    res.json(result); } 
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
  console.log(`Example app listening at http://localhost:3000`)
})
