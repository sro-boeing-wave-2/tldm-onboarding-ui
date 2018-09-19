import { TestBed, inject } from '@angular/core/testing';

import { BotIntegrationService } from './bot-integration.service';

describe('BotIntegrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotIntegrationService]
    });
  });

  // it('should be created', inject([BotIntegrationService], (service: BotIntegrationService) => {
  //   expect(service).toBeTruthy();
  // }));
});
