"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiModule = void 0;
const common_1 = require("@nestjs/common");
const groq_service_1 = require("./groq.service");
const user_context_service_1 = require("../user-context/user-context.service");
let OpenaiModule = class OpenaiModule {
};
exports.OpenaiModule = OpenaiModule;
exports.OpenaiModule = OpenaiModule = __decorate([
    (0, common_1.Module)({
        providers: [groq_service_1.GroqService, user_context_service_1.UserContextService],
    })
], OpenaiModule);
//# sourceMappingURL=groq.module.js.map