import { Module } from '@nestjs/common';
import { GroqService } from './groq.service';
import { UserContextService } from 'src/user-context/user-context.service';

@Module({
  providers: [GroqService, UserContextService],
})
export class OpenaiModule {}
