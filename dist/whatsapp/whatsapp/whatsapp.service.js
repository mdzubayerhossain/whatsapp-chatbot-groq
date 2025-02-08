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
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const groq_service_1 = require("../../openai/groq.service");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    constructor(GroqService) {
        this.GroqService = GroqService;
        this.httpService = new axios_1.HttpService();
        this.logger = new common_1.Logger(WhatsappService_1.name);
        this.url = `https://graph.facebook.com/${process.env.WHATSAPP_CLOUD_API_VERSION}/${process.env.WHATSAPP_CLOUD_API_PHONE_NUMBER_ID}/messages`;
        this.config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_ACCESS_TOKEN}`,
            },
        };
    }
    async sendWhatsAppMessage(messageSender, userInput, messageID) {
        const aiResponse = await this.GroqService.generateAIResponse(messageSender, userInput);
        const data = JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: messageSender,
            context: {
                message_id: messageID,
            },
            type: 'text',
            text: {
                preview_url: false,
                body: aiResponse,
            },
        });
        try {
            const response = this.httpService
                .post(this.url, data, this.config)
                .pipe((0, rxjs_1.map)((res) => {
                return res.data;
            }))
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(error);
                throw new common_1.BadRequestException('Error Posting To WhatsApp Cloud API');
            }));
            const messageSendingStatus = await (0, rxjs_1.lastValueFrom)(response);
            this.logger.log('Message Sent. Status:', messageSendingStatus);
        }
        catch (error) {
            this.logger.error(error);
            return 'Axle broke!! Abort mission!!';
        }
    }
    async sendImageByUrl(messageSender, fileName, messageID) {
        const imageUrl = `${process.env.SERVER_URL}/${fileName}`;
        const data = JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: messageSender,
            context: {
                message_id: messageID,
            },
            type: 'image',
            image: {
                link: imageUrl,
            },
        });
        try {
            const response = this.httpService
                .post(this.url, data, this.config)
                .pipe((0, rxjs_1.map)((res) => {
                return res.data;
            }))
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(error);
                throw new common_1.BadRequestException('Error Posting To WhatsApp Cloud API');
            }));
            const messageSendingStatus = await (0, rxjs_1.lastValueFrom)(response);
            return `Image sent successfully, response: ${messageSendingStatus}`;
        }
        catch (error) {
            this.logger.error(error);
            return 'Axle broke!! Error Sending Image!!';
        }
    }
    async markMessageAsRead(messageID) {
        const data = JSON.stringify({
            messaging_product: 'whatsapp',
            status: 'read',
            message_id: messageID,
        });
        try {
            const response = this.httpService
                .post(this.url, data, this.config)
                .pipe((0, rxjs_1.map)((res) => {
                return res.data;
            }))
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(error);
                throw new common_1.BadRequestException('Error Marking Message As Read');
            }));
            const messageStatus = await (0, rxjs_1.lastValueFrom)(response);
            this.logger.log('Message Marked As Read. Status:', messageStatus);
        }
        catch (error) {
            this.logger.error(error);
            return 'Axle broke!! Abort mission!!';
        }
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [groq_service_1.GroqService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map