"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GroqService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = require("groq-sdk");
const user_context_service_1 = require("../user-context/user-context.service");
let GroqService = GroqService_1 = class GroqService {
    constructor(context) {
        this.context = context;
        this.groq = new groq_sdk_1.Groq({
            apiKey: process.env.GROQ_API_KEY || '',
        });
        this.logger = new common_1.Logger(GroqService_1.name);
    }
    async generateAIResponse(userID, userInput) {
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
            const userContext = await this.context.saveAndFetchContext(userInput, 'user', userID);
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
        }
        catch (error) {
            this.logger.error('Error generating AI response', error);
            return 'Sorry, I am unable to process your request at the moment.';
        }
    }
};
exports.GroqService = GroqService;
exports.GroqService = GroqService = GroqService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_context_service_1.UserContextService])
], GroqService);
//# sourceMappingURL=groq.service.js.map