import { TestBed, inject } from '@angular/core/testing';

import { MultimediaService } from './multimedia.service';

describe('MultimediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultimediaService]
    });
  });

  it('should be created', inject([MultimediaService], (service: MultimediaService) => {
    expect(service).toBeTruthy();
  }));
});
