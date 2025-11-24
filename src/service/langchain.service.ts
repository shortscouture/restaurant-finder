import { createAgent, tool, createMiddleware, ToolMessage } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import * as z from "zod";
import dotenv from "dotenv";

dotenv.config({ path:'../.env' });

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


  /*zod schema*/
  const RestaurantInfo = z.object({
    query: z.string(),
    address: z.string(),
    taste: z.array(z.string()),
  });

  /*LLM*/
  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.1,
    maxTokens: 1000,
    timeout: 30,
    apiKey: config.openaiAPI,
  });

  /*catch error*/
  const handleToolErrors = createMiddleware({
    name: "HandleToolErrors",
    wrapToolCall: async (request, handler) => {
      try {
        return await handler(request);
      } catch (error) {
        // Return a custom error message to the model
        return new ToolMessage({
          content: `Tool error: Please check your input and try again. (${error})`,
          tool_call_id: request.toolCall.id!,
        });
      }
    },
  }); 
  /* agent */

  const agent = createAgent({
    model,
    responseFormat: RestaurantInfo, 
    middleware: [handleToolErrors],
    systemPrompt: "You are an AI chatbot that will take the user input of the customer, asking about "
  });

  /*result from agent*/
export async function agentResult () {
  const result = await agent.invoke({
      messages: [
      {
        role: "user",
        content: "Find a sushi restaurant near me in Los Angeles ",
      },
    ],
  });
}
/*log json*/
console.log(agentResult.structuredResponse); /*API request should capture this?*/


