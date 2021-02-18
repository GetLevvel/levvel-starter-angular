/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let service: LoginGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array) => ({}) });
    const authenticationServiceStub = () => ({ isLoggedIn: (arg) => true });
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: Router, useFactory: routerStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub,
        },
      ],
    });
    service = TestBed.inject(LoginGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
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
      const val = service.canActivate();
      const isLoggedIn = authenticationServiceStub.isLoggedIn(true);

      if (isLoggedIn) {
        expect(routerStub.navigate).toHaveBeenCalled();
        expect(service.canActivate()).toEqual(false);
      } else {
        expect(routerStub.navigate).not.toHaveBeenCalled();
        expect(service.canActivate()).toEqual(true);
      }
      expect(authenticationServiceStub.isLoggedIn).toHaveBeenCalled();
      expect(val).toEqual(!authenticationServiceStub.isLoggedIn(true));
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      jest.spyOn(service, 'ngOnDestroy').getMockImplementation();
      service.ngOnDestroy();
      expect(service.ngOnDestroy).toHaveBeenCalled();
    });
  });
});
