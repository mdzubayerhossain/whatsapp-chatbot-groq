import { Test, TestingModule } from '@nestjs/testing';
import { GroqService } from './groq.service';
import { UserContextService } from 'src/user-context/user-context.service';

describe('GroqService', () => {
  let service: GroqService;
  let userContextService: UserContextService;

  beforeEach(async () => {
    // Create a mock for UserContextService
    const mockUserContextService = {
      saveAndFetchContext: jest.fn(),
      saveToContext: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroqService,
        {
          provide: UserContextService,
          useValue: mockUserContextService,
        },
      ],
    }).compile();

    service = module.get<GroqService>(GroqService);
    userContextService = module.get<UserContextService>(UserContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate AI response successfully', async () => {
    // Mock the context service response
    const mockContext = [
      { role: 'user', content: 'test message' }
    ];
    (userContextService.saveAndFetchContext as jest.Mock).mockResolvedValue(mockContext);
    
    // Mock environment variables
    process.env.GROQ_API_KEY = 'test-key';
    
    const response = await service.generateAIResponse('user123', 'test message');
    expect(response).toBeDefined();
  });

  it('should handle errors gracefully', async () => {
    // Mock a failed context service
    (userContextService.saveAndFetchContext as jest.Mock).mockRejectedValue(new Error('Test error'));
    
    const response = await service.generateAIResponse('user123', 'test message');
    expect(response).toBe('Sorry, I am unable to process your request at the moment.');
  });
});