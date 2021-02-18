/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { LogoutRoutingModule } from './logout.routing';

describe('LogoutRoutingModule', () => {
  let pipe: LogoutRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LogoutRoutingModule] });
    pipe = TestBed.inject(LogoutRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
