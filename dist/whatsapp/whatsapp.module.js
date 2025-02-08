"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_controller_1 = require("./whatsapp/whatsapp.controller");
const whatsapp_service_1 = require("./whatsapp/whatsapp.service");
const groq_service_1 = require("../openai/groq.service");
const user_context_service_1 = require("../user-context/user-context.service");
const stabilityai_service_1 = require("../stabilityai/stabilityai.service");
let WhatsappModule = class WhatsappModule {
};
exports.WhatsappModule = WhatsappModule;
exports.WhatsappModule = WhatsappModule = __decorate([
    (0, common_1.Module)({
        controllers: [whatsapp_controller_1.WhatsappController],
        providers: [
            groq_service_1.GroqService,
            whatsapp_service_1.WhatsappService,
            user_context_service_1.UserContextService,
            stabilityai_service_1.StabilityaiService,
        ],
    })
], WhatsappModule);
//# sourceMappingURL=whatsapp.module.js.map