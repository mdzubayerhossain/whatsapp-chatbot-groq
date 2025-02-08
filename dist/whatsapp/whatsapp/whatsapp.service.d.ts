import { GroqService } from 'src/openai/groq.service';
export declare class WhatsappService {
    private readonly GroqService;
    constructor(GroqService: GroqService);
    private readonly httpService;
    private readonly logger;
    private readonly url;
    private readonly config;
    sendWhatsAppMessage(messageSender: string, userInput: string, messageID: string): Promise<string>;
    sendImageByUrl(messageSender: string, fileName: string, messageID: string): Promise<string>;
    markMessageAsRead(messageID: string): Promise<string>;
}
