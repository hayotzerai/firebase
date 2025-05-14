import { OpenAI } from 'openai';
import { openaiConfig } from '../config/config';


export const openai = new OpenAI({
    apiKey: openaiConfig.apiKey,
});

