import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { PreWeddingComponent } from './PreWedding.component';
import { ServiceService } from '../service.service'; // Import your service

describe('PreWeddingComponent', () => {
  let component: PreWeddingComponent;
  let fixture: ComponentFixture<PreWeddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreWeddingComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ServiceService], // Provide your service
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
