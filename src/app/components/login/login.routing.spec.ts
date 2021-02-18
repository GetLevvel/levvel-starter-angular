/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { LoginRoutingModule } from './login.routing';

describe('LoginRoutingModule', () => {
  let pipe: LoginRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LoginRoutingModule] });
    pipe = TestBed.inject(LoginRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
