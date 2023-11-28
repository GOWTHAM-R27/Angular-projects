import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { ProtectAdminGuard } from './protect-admin.guard';

describe('ProtectAdminGuard', () => {
  let guard: ProtectAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ProtectAdminGuard], // Provide your guard
    });
    guard = TestBed.inject(ProtectAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
