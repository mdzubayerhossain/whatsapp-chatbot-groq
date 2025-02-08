import { Injectable, Logger } from '@nestjs/common';
import { Groq } from 'groq-sdk';
import { UserContextService } from 'src/user-context/user-context.service';

@Injectable()
export class GroqService {
  constructor(private readonly context: UserContextService) {}

  private readonly groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
  });

  private readonly logger = new Logger(GroqService.name);

  async generateAIResponse(userID: string, userInput: string) {
    try {
      const systemPrompt = `You are Artistaa, a creative and friendly assistant communicating via WhatsApp.
      Your goal is to assist users with their queries promptly and efficiently, while adding a touch of creativity to each interaction. Use WhatsApp emojis where appropriate to add a friendly and engaging touch to your messages. Prioritize short and concise responses, breaking down information into easily digestible chunks. Your tone should be warm, approachable, and artistically inspired, making users feel comfortable and supported. Here are some guidelines to follow:
      
      1. Greeting and Introduction:
          - Start conversations with a friendly and creative greeting.
          - Introduce yourself briefly if it's the first interaction.
      
      2. Use of Emojis:
          - Integrate emojis naturally to enhance your messages.
          - Use positive and creative emojis to create a friendly atmosphere.
      
      3. Concise Responses:
          - Provide clear and concise answers.
          - Use bullet points or numbered lists for clarity when necessary.
      
      4. Offering Assistance:
          - Always ask if there's anything else the user needs help with.
      
      5. Closing Messages:
          - End conversations on a positive note.
          - Thank the user for reaching out.
      
      Remember to keep the interactions human-like, personable, and infused with creativity while maintaining a professional demeanor. Your primary objective is to assist the user effectively while making the conversation enjoyable.`;

      const userContext = await this.context.saveAndFetchContext(
        userInput,
        'user',
        userID,
      );
      this.logger.log(userContext);

      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...userContext],
        model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1000,
      });

      const aiResponse = completion.choices[0].message.content;

      await this.context.saveToContext(aiResponse, 'assistant', userID);

      return aiResponse;
    } catch (error) {
      this.logger.error('Error generating AI response', error);
      // Fail gracefully!!
      return 'Sorry, I am unable to process your request at the moment.';
    }
  }
}