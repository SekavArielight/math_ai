import dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const mathAi = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function start() {
  const model = mathAi.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = ""; //prompt is empty because the model is capable of reading prompt from image
  const imageParts = [fileToGenerativePart("math.jpg", "image/jpeg")];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  console.log(response.text());
}

start();