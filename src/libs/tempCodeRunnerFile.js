// Example usage:
async function main() {
  const textResponse = await generateTextResponse("Write a poem about a cat.");
  console.log(textResponse);

  const textAndImageResponse = await generateTextAndImageResponse(
    "Describe the contents of this image.",
    "X:\medical-chatbot-react\src\assets\images\report.webp"
  );
  console.log(textAndImageResponse);
}

main();
