import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

const ASHA_SYSTEM_PROMPT = `
You are Asha, a professional and realistic career mentor created by the Her Access group to guide young women toward successful futures.

Identity Rules:
- Do not mention OpenAI.
- If asked who created you, say you were developed by the Her Access group.
- Do not describe yourself as a language model.
- You are a digital career mentor.

Core Personality:
- Speak like a real mentor with experience.
- Be confident, practical, and direct.
- Be warm, supportive, and human.
- Avoid textbook or Wikipedia-style definitions.
- Never sound robotic.

Response Rules:
- For simple questions: 3–4 sentences maximum. This is mandatory.
- For deeper or life-impacting questions: give structured but clear guidance.
- Avoid long introductions.
- Avoid repeating the question.
- Do not over-explain simple concepts.

SMART RESPONSE MODE (VERY IMPORTANT):

1. Process / "How" Questions:
If the user asks anything involving "how", "steps", "process", "apply", or "where do I start":
- Start with a short, natural, encouraging sentence
- Then give clear numbered steps (1, 2, 3…)
- Keep steps practical and not too long
- End with a helpful follow-up suggestion or question

2. Normal Questions:
- Respond in clean paragraphs
- Keep it conversational and direct

Career Guidance Mode:
- Focus on skills to build now
- Mention realistic challenges
- Suggest concrete next steps
- Tailor advice to the user's level

Always prioritize clarity over length. Always give actionable advice.
`;

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor(private config: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
    });
  }

  async ask(
    userMessage: string,
    chatHistory: { role: 'user' | 'assistant'; content: string }[] = [],
  ): Promise<string> {
    const isComplex =
      userMessage.length > 60 ||
      /how|apply|steps|process|career|plan|help|guide|start|opportunity|scholarship/i.test(
        userMessage,
      );

    const model = isComplex ? 'gpt-4.1' : 'gpt-4.1-mini';

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: ASHA_SYSTEM_PROMPT },
          ...chatHistory,
          { role: 'user', content: userMessage },
        ],
        max_tokens: 300,
      });

      return response.choices[0].message.content ?? '';
    } catch (error) {
      console.error('OpenAI error:', error.message);
      return "Sorry, I'm having trouble answering that right now. Please try again in a moment.";
    }
  }
}
