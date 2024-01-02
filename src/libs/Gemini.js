const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Function for text-only chat
async function chat(msg, history = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();

  return { text, history: chat.history };
}

// Function for text and image path
async function textAndImages(msg, imagePath, history = []) {
  const imageParts = [
    {
      inlineData: {
        data: fs.readFileSync(imagePath).toString("base64"),
        mimeType: getMimeType(imagePath),
      },
    },
  ];

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

// Helper function to determine MIME type based on path extension
function getMimeType(path) {
  const extension = path.split(".").pop();
  switch (extension) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    // Add more cases for other supported image formats
    default:
      throw new Error(`Unsupported image format: ${extension}`);
  }
}

module.exports = { chat, textAndImages, resetHistory };
