import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { GroqService } from 'src/openai/groq.service';
import { UserContextService } from '../user-context/user-context.service';
import { StabilityaiService } from '../stabilityai/stabilityai.service';

@Module({
  controllers: [WhatsappController],
  providers: [
    GroqService,
    WhatsappService,
    UserContextService,
    StabilityaiService,
  ],
})
export class WhatsappModule {}
