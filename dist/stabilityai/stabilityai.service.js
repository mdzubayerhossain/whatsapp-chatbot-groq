"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StabilityaiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StabilityaiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const fs = require("fs");
const path_1 = require("path");
let StabilityaiService = StabilityaiService_1 = class StabilityaiService {
    constructor() {
        this.httpService = new axios_1.HttpService();
        this.logger = new common_1.Logger(StabilityaiService_1.name);
        this.configuration = {
            apiHost: process.env.STABILITYAI_API_HOST || '',
            token: process.env.STABILITYAI_TOKEN || '',
            engineId: 'stable-diffusion-xl-1024-v1-0',
        };
    }
    async textToImage(prompt) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: this.configuration.token,
            },
        };
        const data = JSON.stringify({
            text_prompts: [
                {
                    text: prompt,
                },
            ],
            steps: 40,
        });
        try {
            const url = `${this.configuration.apiHost}/v1/generation/${this.configuration.engineId}/text-to-image`;
            const response = this.httpService
                .post(url, data, config)
                .pipe((0, rxjs_1.map)((res) => {
                return res.data;
            }))
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(error);
                throw new common_1.BadRequestException('Error Generating Image');
            }));
            const imageGenerationResponse = await (0, rxjs_1.lastValueFrom)(response);
            const fileNames = [];
            const rootPath = process.cwd();
            const folderPath = (0, path_1.join)(rootPath, 'generatedImages');
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            imageGenerationResponse.artifacts.forEach((image, index) => {
                const now = new Date();
                const fileName = `v1_txt2img_${now.getTime()}_${index}.png`;
                fs.writeFileSync(`${folderPath}/${fileName}`, Buffer.from(image.base64, 'base64'));
                fileNames.push(fileName);
            });
            return fileNames;
        }
        catch (e) {
            return 'Image generation failed, try later.';
        }
    }
};
exports.StabilityaiService = StabilityaiService;
exports.StabilityaiService = StabilityaiService = StabilityaiService_1 = __decorate([
    (0, common_1.Injectable)()
], StabilityaiService);
//# sourceMappingURL=stabilityai.service.js.map