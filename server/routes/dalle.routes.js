import express from "express";
import * as dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import sharp from "sharp";

dotenv.config();

const router = express.Router();

// Using Hugging Face's free Stable Diffusion model
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || "");

router.route("/").get((req, res) => {
  res
    .status(200)
    .json({ message: "Hello from AI Image Generator (Hugging Face)" });
});

async function generatePatternImage(prompt) {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
  ];

  let selectedColors = colors.slice(0, 3);
  const promptLower = prompt.toLowerCase();

  if (promptLower.includes("blue"))
    selectedColors = ["#45B7D1", "#6BB6FF", "#4A90E2"];
  if (promptLower.includes("red"))
    selectedColors = ["#FF6B6B", "#E74C3C", "#FF4757"];
  if (promptLower.includes("green"))
    selectedColors = ["#4ECDC4", "#2ECC71", "#55A3FF"];
  if (promptLower.includes("purple"))
    selectedColors = ["#BB8FCE", "#9B59B6", "#A569BD"];

  let svgContent = "";
  const width = 1024;
  const height = 1024;

  // Generate circles pattern
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 20 + Math.random() * 80;
    const color =
      selectedColors[Math.floor(Math.random() * selectedColors.length)];
    const opacity = 0.3 + Math.random() * 0.7;
    svgContent += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      ${svgContent}
    </svg>
  `;

  // Convert SVG to PNG using Sharp
  try {
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer.toString("base64");
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    // Fallback: return SVG as base64 if conversion fails
    return Buffer.from(svg).toString("base64");
  }
}

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("Received prompt:", prompt);

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Try Hugging Face first, fall back to pattern generator
    try {
      console.log("Trying Hugging Face...");
      const response = await hf.textToImage({
        model: "runwayml/stable-diffusion-v1-5",
        inputs: prompt.trim(),
      });

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");

      console.log("✅ Hugging Face image generated successfully!");
      res.status(200).json({ photo: base64Image });
    } catch (hfError) {
      console.log("Hugging Face failed, using pattern generator fallback...");

      // Generate a colorful pattern based on the prompt
      const patternImage = await generatePatternImage(prompt.trim());

      console.log("✅ Pattern image generated successfully!");
      res.status(200).json({
        photo: patternImage,
        message: "Generated using pattern creator (AI temporarily unavailable)",
      });
    }
  } catch (error) {
    console.error("Error in image generation:", error);
    res.status(500).json({
      message: "Failed to generate image",
      error: error.message,
    });
  }
});

export default router;
