import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { LogincontrollsGuard } from './logincontrolls.guard';

describe('LogincontrollsGuard', () => {
  let guard: LogincontrollsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [LogincontrollsGuard], // Provide your guard
    });
    guard = TestBed.inject(LogincontrollsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
