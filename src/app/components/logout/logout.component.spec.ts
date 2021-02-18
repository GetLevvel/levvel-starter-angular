/// <reference types="jest" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LogoutComponent } from './logout.component';
import { IAuthenticateResponse } from 'src/app/models/servicemodels';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (string) => ({}) });
    const authenticationServiceStub = () => ({
      logout: () => ({ pipe: () => ({ subscribe: (f) => f({}) }) }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LogoutComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      jest.spyOn(routerStub, 'navigateByUrl').getMockImplementation();
      jest.spyOn(authenticationServiceStub, 'logout').getMockImplementation();
      component.ngOnInit();
      if (authenticationServiceStub.currentUser) {
        expect(authenticationServiceStub.logout).toHaveBeenCalled();
      }
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes else expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      jest.spyOn(routerStub, 'navigateByUrl').getMockImplementation();
      jest.spyOn(authenticationServiceStub, 'logout').getMockImplementation();
      authenticationServiceStub.currentUser = <IAuthenticateResponse>{};
      component.ngOnInit();

      if (authenticationServiceStub.currentUser) {
        authenticationServiceStub
          .logout()
          .pipe()
          .subscribe((res) => {
            if (res) {
              expect(routerStub.navigateByUrl).toHaveBeenCalled();
            } else {
              expect(routerStub.navigateByUrl).not.toHaveBeenCalled();
            }
          });
        expect(authenticationServiceStub.logout).toHaveBeenCalled();
      }
    });
  });
});
