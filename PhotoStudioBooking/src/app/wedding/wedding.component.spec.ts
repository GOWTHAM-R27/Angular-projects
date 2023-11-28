import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { WeddingComponent } from './wedding.component';
import { ServiceService } from '../service.service'; // Import your service

describe('WeddingComponent', () => {
  let component: WeddingComponent;
  let fixture: ComponentFixture<WeddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingComponent ],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [
        {
          provide: ServiceService, // Provide a mock for ServiceService
          useValue: {
            priceDetails: () => {
              return {
                subscribe: (callback: any) => {
                  callback({ /* Mock data here */ });
                }
              };
            },
            setCategoryName: () => {}
            // Add other methods you're using
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
