import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookNowComponent } from './BookNow.component';
import { ServiceService } from '../service.service';

describe('BookNowComponent', () => {
  let component: BookNowComponent;
  let fixture: ComponentFixture<BookNowComponent>;

  // Mock ServiceService
  const serviceServiceMock = {
    userinfo: () => {
      return {
        subscribe: (callback: any) => {
          callback({ /* Mock data here */ });
        }
      };
    },
    getDiscountPrice: () => {
      return {
        subscribe: (callback: any) => {
          callback({ /* Mock data here */ });
        }
      };
    },
    getDiscountPricePremium: () => {
      return {
        subscribe: (callback: any) => {
          callback({ /* Mock data here */ });
        }
      };
    },
    getCategoryName: () => {
      return {
        category: 'mockedCategory',
        photo: '1',
        video: '1'
      };
    },
    priceDetails: () => {
      return {
        subscribe: (callback: any) => {
          callback({ /* Mock price details here */ });
        }
      };
    }
    // Add other methods you're using
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookNowComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule], // Include ReactiveFormsModule here
      providers: [
        {
          provide: ServiceService,
          useValue: serviceServiceMock // Use the mock implementation
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
