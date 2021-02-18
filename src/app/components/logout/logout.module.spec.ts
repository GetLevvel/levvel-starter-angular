/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { LogoutModule } from './logout.module';

describe('LogoutModule', () => {
  let pipe: LogoutModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LogoutModule] });
    pipe = TestBed.inject(LogoutModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
