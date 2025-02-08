import { UserContextService } from 'src/user-context/user-context.service';
export declare class GroqService {
    private readonly context;
    constructor(context: UserContextService);
    private readonly groq;
    private readonly logger;
    generateAIResponse(userID: string, userInput: string): Promise<string>;
}
