import dotenv from "dotenv";
dotenv.config({ path:'/Users/shortscouture/Documents/js/restaurant-finder/.env' });
import { OpenAI } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import {z} from "zod";
interface Config {
 // port: number
  nodeEnv: string;  
  openaiAPI: string;  
  //fourSquareAPI: string;
};
/*env config*/
const config: Config = {
  //port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  openaiAPI: process.env.OPENAI_API_KEY,
  //fourSquareAPI: process.env.FOURSQUARE_API,
}; 

const client = new OpenAI();

const RestaurantSchema = z.object({
    query: z.string(),
    address: z.string(),
    taste: z.array(z.string()),
  });


export async function openaiResult () {
    const response = await client.responses.parse({
    model: "gpt-4o",
    input: [
    { role: "system", content: "Extract what the user asks of you when checking for restaurants." },
    {role: "user", content: "I want to eat in a sushi restaurant near Los Angeles.",
    },
  ],
  text: {
    format: zodTextFormat(RestaurantSchema, "event"),
  },
});}
