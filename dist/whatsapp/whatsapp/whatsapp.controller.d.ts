import { Request } from 'express';
import { WhatsappService } from './whatsapp.service';
import { StabilityaiService } from 'src/stabilityai/stabilityai.service';
export declare class WhatsappController {
    private readonly whatsAppService;
    private readonly stabilityaiService;
    constructor(whatsAppService: WhatsappService, stabilityaiService: StabilityaiService);
    whatsappVerificationChallenge(request: Request): string;
    handleIncomingWhatsappMessage(request: any): Promise<string>;
}
