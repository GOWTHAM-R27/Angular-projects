import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { ServiceService } from './service.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import HttpClientTestingModule
        RouterTestingModule, // Import RouterTestingModule
      ],
      providers: [ServiceService], // Provide ServiceService
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
