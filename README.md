This is the README for the restaurant-finder internshop coding challenge.

What I did in this challenge is that I have used OpenAI's api for the LLM and used FourSquare's provided API for to get the restaurant's info from the LLM's json output.
The codebases uses node.js with typescript. 

How to install:
1. install packages with npm install
2. to run server: `npx ts-node index.ts`


Environment config:
I used .env with these variables:
`OPENAI_API_KEY` - openAI API key
`fourSquareAPI`- Foursquare Places API key
`code` - for validation

Assumptions: It should be able to query restaurants depending on the location, and that the program assumes it has environment variables through .env. The LLM uses `gpt-4o` for parsing the user input. User input that the LLM takes is in the source code. 
