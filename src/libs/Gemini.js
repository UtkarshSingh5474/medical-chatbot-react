const { GoogleGenerativeAI } = require("@google/generative-ai");


// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result.split(',')[1]; // Extract base64 data
      const mimeType = getFileMimeType(file.name);
      
      resolve({
        inlineData: {
          data,
          mimeType,
        },
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

function getFileMimeType(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();

  // You can add more cases for different file types if needed
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
      case 'webp':
        return 'image/webp'; // added support for webp
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream'; // default to binary data if mimeType is unknown
  }
}


export async function generateText(file) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Extract text from this image:";

  // Convert file to GoogleGenerativeAI.Part object
  const imagePart = await fileToGenerativePart(file);

  // Explicitly set the 'data' field for the image part
  const imageContent = {
    inlineData: {
      data: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
    },
  };

  const result = await model.generateContent([prompt, imageContent]);
  const response = await result.response;
  const text = response.text();
  return text;
}
