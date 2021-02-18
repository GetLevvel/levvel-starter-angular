/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AppGuard } from './app.guard';

describe('AppGuard', () => {
  let service: AppGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array) => ({}) });
    const authenticationServiceStub = () => ({ isLoggedIn: (arg) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AppGuard,
        { provide: Router, useFactory: routerStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub,
        },
      ],
    });
    service = TestBed.inject(AppGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`isLoggedIn has default value`, () => {
    expect(service.isLoggedIn).toEqual(false);
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      jest
        .spyOn(authenticationServiceStub, 'isLoggedIn')
        .getMockImplementation();
      service.canActivate();
      expect(authenticationServiceStub.isLoggedIn).toHaveBeenCalled();
      if (!service.isLoggedIn) {
        expect(routerStub.navigate).toHaveBeenCalled();
      } else {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      }
    });
  });

  describe('canActivate 2', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      jest
        .spyOn(authenticationServiceStub, 'isLoggedIn')
        .mockReturnValue(false);
      service.canActivate();
      expect(authenticationServiceStub.isLoggedIn).toHaveBeenCalled();
      if (!service.isLoggedIn) {
        expect(routerStub.navigate).toHaveBeenCalled();
      } else {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      }
    });
  });
});
