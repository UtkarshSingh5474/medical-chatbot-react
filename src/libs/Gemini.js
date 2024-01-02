const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);


async function generateText(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    generationConfig: {
      maxOutputTokens: 100,
    },
  });


  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(chat.getHistory());
  return text;
}

// Export for use in React component
module.exports = { generateText };
