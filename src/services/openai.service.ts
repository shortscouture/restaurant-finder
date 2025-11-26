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

//env config
const config: Config = {
  //port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  openaiAPI: process.env.OPENAI_API_KEY,
}; 

const client = new OpenAI();

const RestaurantSchema = z.object({ //zod helps for creating schemas for json, this makes it shorter and easier to parse and read
    query: z.string(),
    relevance: z.array(z.string()),
    near: z.string(),
});

export const response = await client.responses.parse({
    model: "gpt-4o",
    input: [
    { role: "system", content: "Extract what the user asks of you when checking for restaurants. only write a simple json sample. You are gonna do this by seperating the JSON file into query for the user's query. Finally, relevance which checks for how relevant the search is. You are also given near, which is a string naming a locality in the world (i.e. Chicago, IL)."},
    {role: "user", content: "I want to eat in a sushi restaurant around Metro Manila.", //what you want to say
    },
  ],
  text: {
    format: zodTextFormat(RestaurantSchema, "event"),
  },  
});
console.log(response.output_parsed);

export const event = await response.output_parsed; // async for LLM response