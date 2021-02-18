/// <reference types="jest" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LogoutDialog } from './logout-dialog.component';

describe('LogoutDialog', () => {
  let component: LogoutDialog;
  let fixture: ComponentFixture<LogoutDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LogoutDialog],
    });
    fixture = TestBed.createComponent(LogoutDialog);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
