export declare class StabilityaiService {
    private readonly httpService;
    private readonly logger;
    readonly configuration: {
        apiHost: string;
        token: string;
        engineId: string;
    };
    textToImage(prompt: string): Promise<string[] | "Image generation failed, try later.">;
}
