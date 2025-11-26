import dotenv from "dotenv";
dotenv.config({ path:'/Users/shortscouture/Documents/js/restaurant-finder/.env' });
import { OpenAI } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import {z} from "zod";
interface Config {
 // port: number
  nodeEnv: string;  
  openaiAPI: string;  
};
/*env config*/
const config: Config = {
  //port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  openaiAPI: process.env.OPENAI_API_KEY,
}; 

const client = new OpenAI();

const RestaurantSchema = z.object({
    query: z.string(),
    address: z.string(),
    taste: z.array(z.string()),
});


export const response = await client.responses.parse({
    model: "gpt-4o",
    input: [
    { role: "system", content: "Extract what the user asks of you when checking for restaurants. only write a simple json sample. You are gonna do this by seperating the JSON file into query, " },
    {role: "user", content: "I want to eat in a sushi restaurant near Los Angeles.",
    },
  ],
  text: {
    format: zodTextFormat(RestaurantSchema, "event"),
  },  
});
console.log(response.output_parsed);