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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappController = void 0;
const common_1 = require("@nestjs/common");
const process = require("node:process");
const whatsapp_service_1 = require("./whatsapp.service");
const stabilityai_service_1 = require("../../stabilityai/stabilityai.service");
let WhatsappController = class WhatsappController {
    constructor(whatsAppService, stabilityaiService) {
        this.whatsAppService = whatsAppService;
        this.stabilityaiService = stabilityaiService;
    }
    whatsappVerificationChallenge(request) {
        const mode = request.query['hub.mode'];
        const challenge = request.query['hub.challenge'];
        const token = request.query['hub.verify_token'];
        const verificationToken = process.env.WHATSAPP_CLOUD_API_WEBHOOK_VERIFICATION_TOKEN;
        if (!mode || !token) {
            return 'Error verifying token';
        }
        if (mode === 'subscribe' && token === verificationToken) {
            return challenge?.toString();
        }
    }
    async handleIncomingWhatsappMessage(request) {
        const { messages } = request?.entry?.[0]?.changes?.[0].value ?? {};
        if (!messages)
            return;
        const message = messages[0];
        const messageSender = message.from;
        const messageID = message.id;
        await this.whatsAppService.markMessageAsRead(messageID);
        switch (message.type) {
            case 'text':
                const text = message.text.body;
                const imageGenerationCommand = '/imagine';
                if (text.toLowerCase().includes(imageGenerationCommand)) {
                    const response = await this.stabilityaiService.textToImage(text.replaceAll(imageGenerationCommand, ''));
                    if (Array.isArray(response)) {
                        await this.whatsAppService.sendImageByUrl(messageSender, response[0], messageID);
                    }
                    return;
                }
                await this.whatsAppService.sendWhatsAppMessage(messageSender, text, messageID);
                break;
        }
        return 'Message processed';
    }
};
exports.WhatsappController = WhatsappController;
__decorate([
    (0, common_1.Get)('webhook'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "whatsappVerificationChallenge", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "handleIncomingWhatsappMessage", null);
exports.WhatsappController = WhatsappController = __decorate([
    (0, common_1.Controller)('whatsapp'),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService,
        stabilityai_service_1.StabilityaiService])
], WhatsappController);
//# sourceMappingURL=whatsapp.controller.js.map