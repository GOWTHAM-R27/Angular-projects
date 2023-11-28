import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { TravelComponent } from './Travel.component';
import { ServiceService } from '../service.service'; // Import your service

describe('TravelComponent', () => {
  let component: TravelComponent;
  let fixture: ComponentFixture<TravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelComponent ],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ServiceService] // Provide your service
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
