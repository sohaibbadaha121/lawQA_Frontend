import { TestBed } from '@angular/core/testing';
import { ResponseFormatterService } from './response-formatter.service';

describe('ResponseFormatterService', () => {
  let service: ResponseFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns raw string when input is non-JSON string', () => {
    expect(service.formatJsonResponse('plain text')).toBe('plain text');
  });

  it('formats an object containing answer', () => {
    const obj = { answer: 'هذا نص الإجابة' };
    const out = service.formatJsonResponse(obj);
    expect(out).toContain('✅ الإجابة القانونية');
    expect(out).toContain('هذا نص الإجابة');
  });

  it('formats an array of documents and includes separator', () => {
    const arr = [{ answer: 'a1' }, { answer: 'a2' }];
    const out = service.formatJsonResponse(arr);
    expect(out).toContain('النتيجة رقم 1');
    expect(out).toContain('───────────────────');
  });
});
