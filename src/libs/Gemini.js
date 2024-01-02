const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual API key
const API_KEY = "AIzaSyBtUy_Rlsp82hKikGPkAM2D5agB8cp_hXw";

const genAI = new GoogleGenerativeAI(API_KEY);

let history = []; // Store conversation history

export async function generateTextResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent({
    history: history,
    parts: [prompt],
  });
  const response = await result.response
  const text = response.text();
  history.push({ role: "user", parts: prompt });
  history.push({ role: "model", parts: text });

  return text;
}

export async function generateTextAndImageResponse(prompt, imageFilePath) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const imagePart = await model.fileToGenerativePart(imageFilePath);
  const result = await model.generateContent({
    history: history,
    parts: [prompt, imagePart],
  });
  const response = await result.response;
  const text = response.text();

  history.push({ role: "user", parts: prompt });
  history.push({ role: "model", parts: text });

  return text;
}

// // Example usage:
// async function main() {
//   const textResponse = await generateTextResponse("Write a poem about a cat.");
//   console.log(textResponse);

//   const textAndImageResponse = await generateTextAndImageResponse(
//     "Describe the contents of this image.",
//     "X:\medical-chatbot-react\src\assets\images\report.webp"
//   );
//   console.log(textAndImageResponse);
// }

// main();
