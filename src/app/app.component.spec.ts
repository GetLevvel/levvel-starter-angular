/// <reference types="jest" />

import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RoutingModule } from './app.routing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RoutingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
