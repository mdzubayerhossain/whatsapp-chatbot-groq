export declare class UserContextService {
    private readonly redis;
    private readonly logger;
    private readonly salt;
    private readonly contextExpirationTime;
    hashPhoneNumber(phoneNumber: string): string;
    saveToContext(context: string, contextType: 'user' | 'assistant', userID: string): Promise<"Context Saved!" | "Error Saving Context">;
    saveAndFetchContext(context: string, contextType: 'user' | 'assistant', userID: string): Promise<any[]>;
    getConversationHistory(userID: string): Promise<any[]>;
}
