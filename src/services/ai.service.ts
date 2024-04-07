import httpStatus from "http-status";
import { OpenAI } from "openai";
import ApiError from "../utils/ApiError";

/* using ollama with Mistral AI */
const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "mistral", // required but unused
});

const getExplanationStream = async (title: string | null, content: string) => {
  try {
    const systemPrompt = `[INST] System Prompt + Instruction [/INST] Given the title and content of a post on Peerpulse, provide a concise and informative explanation that helps users better understand the post. Assume the role of an AI content explainer assisting users on Peerpulse. Here's the title and content of the post: ${title}. ${content}. Can you provide an explanation for this post within 130 words?`;
    const completion = await openai.chat.completions.create({
      model: "mistral",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.5,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const getSuggestionStream = async (keywords: string) => {
  try {
    const systemPrompt = `[INST] System Prompt + Instruction [/INST] Given the keywords for a post on Peerpulse, provide a catchy and induling content for the post. Assume the role of an AI content generator assisting users on Peerpulse. Here's the line containing keywords for the content of the post: ${keywords}. Can you provide a catchy content for this post within 100 words?`;
    const completion = await openai.chat.completions.create({
      model: "mistral",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.5,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const getHindiTranslation = async (title: string | null, content: string) => {
  try {
    const systemPrompt = `[INST] System Prompt + Instruction [/INST] Given the title and content of a post on Peerpulse, provide a concise and informative translation into french language that helps users better understand the post. Assume the role of an AI content explainer assisting users on Peerpulse. Here's the title and content of the post: ${title}. ${content}. Can you provide an explanation for this post within 130 words in french language?`;
    const completion = await openai.chat.completions.create({
      model: "mistral",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.5,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

export default {
  getExplanationStream,
  getHindiTranslation,
  getSuggestionStream,
};
