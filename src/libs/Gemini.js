const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Replace with your actual API key
const API_KEY = "YOUR_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);

let history = []; // Store conversation history

async function generateTextResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent({
    history: history,
    parts: [prompt],
  });
  const response = await result.response;
  const text = response.text();

  history.push({ role: "user", parts: prompt });
  history.push({ role: "model", parts: text });

  return text;
}

async function generateTextAndImageResponse(prompt, imageFilePath) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const result = await model.generateContent([msg, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  return { text, history: [] }; // Vision model doesn't support chat history
}

// Function to reset history
function resetHistory() {
  return [];
}

// // Example usage:
// async function main() {
//   const textResponse = await generateTextResponse("Write a poem about a cat.");
//   console.log(textResponse);

//   const textAndImageResponse = await generateTextAndImageResponse(
//     "Describe the contents of this image.",
//     "path/to/image.jpg"
//   );
//   console.log(textAndImageResponse);
// }

// main();
