import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class KnowledgeBaseService {
  private readonly logger = new Logger(KnowledgeBaseService.name);
  private knowledgeBase: string[] = [];

  constructor() {
    this.loadKnowledgeBase();
  }

  async loadKnowledgeBase() {
    try {
      const filePath = path.join(__dirname, '../data/knowledge-base.txt');
      const data = fs.readFileSync(filePath, 'utf8');
      this.knowledgeBase = data.split('\n').filter(line => line.trim() !== '');
      this.logger.log('Knowledge base loaded successfully');
    } catch (error) {
      this.logger.error('Error loading knowledge base', error);
    }
  }

  async getResponse(query: string): Promise<string> {
    const response = this.knowledgeBase.find(line => line.includes(query));
    return response || 'No relevant information found.';
  }
}