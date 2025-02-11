import { Controller, Get, Post, Body } from '@nestjs/common';
import { KnowledgeBaseService } from '../services/knowledge-base.service';

@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Get()
  async getKnowledgeBase() {
    try {
      return await this.knowledgeBaseService.loadKnowledgeBase();
    } catch (error) {
      throw new Error('Error loading knowledge base');
    }
  }

  @Post('query')
  async postQuery(@Body('query') query: string) {
    if (!query) {
      throw new Error('Query parameter is missing');
    }
    try {
      return await this.knowledgeBaseService.getResponse(query);
    } catch (error) {
      throw new Error('Error processing query');
    }
  }
}
