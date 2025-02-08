"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserContextService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContextService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const crypto = require("crypto");
let UserContextService = UserContextService_1 = class UserContextService {
    constructor() {
        this.redis = new ioredis_1.Redis(process.env.REDIS_URL || '');
        this.logger = new common_1.Logger(UserContextService_1.name);
        this.salt = process.env.HASHING_SALT;
        this.contextExpirationTime = 10800;
    }
    hashPhoneNumber(phoneNumber) {
        const hashedPhoneNumber = crypto
            .createHmac('sha256', this.salt)
            .update(phoneNumber)
            .digest('hex');
        return hashedPhoneNumber;
    }
    async saveToContext(context, contextType, userID) {
        try {
            const value = JSON.stringify({
                role: contextType,
                content: context,
            });
            const hashedUserID = this.hashPhoneNumber(userID);
            await this.redis.rpush(hashedUserID, value);
            await this.redis.expire(hashedUserID, this.contextExpirationTime);
            return 'Context Saved!';
        }
        catch (error) {
            this.logger.error('Error Saving Context', error);
            return 'Error Saving Context';
        }
    }
    async saveAndFetchContext(context, contextType, userID) {
        try {
            const pipeline = this.redis.pipeline();
            const value = JSON.stringify({
                role: contextType,
                content: context,
            });
            const hashedUserID = this.hashPhoneNumber(userID);
            pipeline.rpush(hashedUserID, value);
            pipeline.lrange(hashedUserID, 0, -1);
            pipeline.expire(hashedUserID, this.contextExpirationTime);
            const results = await pipeline.exec();
            const conversationContext = results[1][1];
            return conversationContext.map((item) => JSON.parse(item));
        }
        catch (error) {
            this.logger.error('Error Saving Context And Retrieving', error);
            return [];
        }
    }
    async getConversationHistory(userID) {
        try {
            const hashedUserID = this.hashPhoneNumber(userID);
            const conversation = await this.redis.lrange(hashedUserID, 0, -1);
            await this.redis.expire(hashedUserID, this.contextExpirationTime);
            return conversation.map((item) => JSON.parse(item));
        }
        catch (error) {
            this.logger.error(error);
            return [];
        }
    }
};
exports.UserContextService = UserContextService;
exports.UserContextService = UserContextService = UserContextService_1 = __decorate([
    (0, common_1.Injectable)()
], UserContextService);
//# sourceMappingURL=user-context.service.js.map