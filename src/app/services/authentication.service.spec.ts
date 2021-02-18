/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { IHttpHeaders } from './http.service';
import { takeUntil } from 'rxjs/operators';
import {
  IAuthenticateResponse,
  IAuthenticateUserQuery,
  ISerializableException,
} from '../models/servicemodels';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    const matSnackBarStub = () => ({
      open: (string, action, object) => ({
        onAction: () => ({ pipe: () => ({ subscribe: (f) => f({}) }) }),
      }),
    });
    const routerStub = () => ({
      navigate: (array) => ({}),
      navigateByUrl: (array) => ({}),
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: Router, useFactory: routerStub },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`logoutPopupTimeout has default value`, () => {
    const val = service['logoutPopupTimeout'];
    expect(service['logoutPopupTimeout']).toBeTruthy();
    expect(val).toEqual(service['logoutPopupTimeout']);
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      jest.spyOn(service.componentDestroyed, 'next').getMockImplementation();
      jest
        .spyOn(service.componentDestroyed, 'complete')
        .getMockImplementation();
      service.ngOnDestroy();
      expect(service.componentDestroyed.next).toHaveBeenCalled();
      expect(service.componentDestroyed.complete).toHaveBeenCalled();
    });
  });

  describe('isAdmin', () => {
    it('makes expected calls', () => {
      service.currentUser = undefined;
      const val = service.isAdmin();
      if (service.currentUser) {
        expect(val).toEqual(service.currentUser.userInfo.isAdmin);
      } else {
        expect(val).toEqual(false);
      }
    });
  });

  describe('isAdmin 2', () => {
    it('makes expected calls', () => {
      service.currentUser = <IAuthenticateResponse>{
        userInfo: { isAdmin: false },
      };
      const val = service.isAdmin();
      if (service.currentUser) {
        expect(val).toEqual(service.currentUser.userInfo.isAdmin);
      } else {
        expect(val).toEqual(false);
      }
    });
  });

  describe('isLoggedIn', () => {
    it('makes expected calls', () => {
      const checkExpirationStub: boolean = false;
      const val = service.isLoggedIn(checkExpirationStub);
      if (checkExpirationStub) {
        expect(service['checkTokenExpiration']).toHaveBeenCalled();
        if (
          service.currentUser.token &&
          new Date(service.currentUser.token.expiresAt) <= new Date()
        ) {
          expect(service.currentUser).toEqual(null);
        }
      }
      expect(val).toEqual(!!service.currentUser);
    });
  });

  // describe('login', () => {
  //   it('makes expected calls', () => {
  //     const httpTestingController = TestBed.inject(HttpTestingController);
  //     const iAuthenticateUserQueryStub: IAuthenticateUserQuery = <
  //       IAuthenticateUserQuery
  //     >{};
  //     jest.spyOn(service, 'handleError').getMockImplementation();
  //     service.login(iAuthenticateUserQueryStub).subscribe(
  //       (res) => {
  //         expect(res).toEqual(iAuthenticateUserQueryStub);
  //       },
  //       () => {
  //         expect(service.handleError).toHaveBeenCalled();
  //       }
  //     );
  //     const req = httpTestingController.expectOne('/api/users/authenticate');
  //     expect(req.request.method).toEqual('POST');
  //     req.flush(iAuthenticateUserQueryStub);
  //     httpTestingController.verify();
  //   });
  // });

  describe('logoutAndRedirect', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(routerStub, 'navigateByUrl').getMockImplementation();
      service.logoutAndRedirect();
      service.logout().subscribe((res) => {
        if (res) {
          expect(routerStub.navigateByUrl).toHaveBeenCalled();
        }
      });
    });
  });

  describe('refreshToken', () => {
    it('makes expected calls', () => {
      service.refreshToken();
      service['POST']('/api/users/refreshtoken', null)
        .pipe(takeUntil(service.componentDestroyed))
        .subscribe((resp) => {
          expect(service['handleAuthResponse']).toHaveBeenCalled();
          expect(service.currentUser).toEqual(resp);
          expect(resp).toBeTruthy();
        });
    });
  });

  describe('handleError', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 401,
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      service.handleError(httpErrorResponseStub);
      if (!navigator.onLine) {
        expect(matSnackBarStub.open).toHaveBeenCalled();
      }
      if (httpErrorResponseStub.status === 401) {
        expect(routerStub.navigate).toHaveBeenCalled();
      } else {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      }
    });
  });

  describe('handleError 2', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 400,
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      service.handleError(httpErrorResponseStub);
      if (!navigator.onLine) {
        expect(matSnackBarStub.open).toHaveBeenCalled();
      }
      if (httpErrorResponseStub.status === 400) {
        expect(routerStub.navigate).toHaveBeenCalled();
      } else {
        expect(routerStub.navigate).not.toHaveBeenCalled();
      }
    });
  });

  describe('handleError 3', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 403,
        error: { message: 'You are not allowed to do this!' },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual('You are not allowed to do this!');
      service.handleError(httpErrorResponseStub);
      if (httpErrorResponseStub.status === 403) {
        expect(message).toEqual('You are not allowed to do this!');
      } else {
        expect(message).not.toEqual('You are not allowed to do this!');
      }
    });
  });

  describe('handleError 3', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 404,
        error: {
          message: `The server couldn't find the resource you requested`,
        },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual(
        `The server couldn't find the resource you requested`
      );
      service.handleError(httpErrorResponseStub);
      if (httpErrorResponseStub.status === 404) {
        expect(message).toEqual(
          `The server couldn't find the resource you requested`
        );
      } else {
        expect(message).not.toEqual(
          `The server couldn't find the resource you requested`
        );
      }
    });
  });

  describe('handleError 4', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 408,
        error: {
          message: `Request timed out.`,
        },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual(`Request timed out.`);
      service.handleError(httpErrorResponseStub);
      if (httpErrorResponseStub.status === 408) {
        expect(message).toEqual(`Request timed out.`);
      } else {
        expect(message).not.toEqual(`Request timed out.`);
      }
    });
  });

  describe('handleError 5', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 405,
        error: {
          message: `Oops, an error occured! Please submit a bug report`,
        },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual(
        `Oops, an error occured! Please submit a bug report`
      );
      service.handleError(httpErrorResponseStub);
      if (httpErrorResponseStub.status === 405) {
        expect(message).toEqual(
          `Oops, an error occured! Please submit a bug report`
        );
      } else {
        expect(message).not.toEqual(
          `Oops, an error occured! Please submit a bug report`
        );
      }
    });
  });

  describe('handleError 6', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 500,
        error: {
          message: `Fatal error on our end.`,
        },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual(`Fatal error on our end.`);
      service.handleError(httpErrorResponseStub);
      if (httpErrorResponseStub.status === 500) {
        expect(message).toEqual(`Fatal error on our end.`);
      } else {
        expect(message).not.toEqual(`Fatal error on our end.`);
      }
    });
  });

  describe('handleError 7', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 503,
        error: {
          message: `Service unavailable. Updating / Overloaded.`,
        },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual(`Service unavailable. Updating / Overloaded.`);
      service.handleError(httpErrorResponseStub);
      if (httpErrorResponseStub.status === 503) {
        expect(message).toEqual(`Service unavailable. Updating / Overloaded.`);
      } else {
        expect(message).not.toEqual(
          `Service unavailable. Updating / Overloaded.`
        );
      }
    });
  });

  describe('handleError 8', () => {
    it('makes expected calls', () => {
      const httpErrorResponseStub: HttpErrorResponse = <HttpErrorResponse>{
        status: 402,
        error: {
          message: `Message`,
        },
      };
      const matSnackBarStub: MatSnackBar = TestBed.inject(MatSnackBar);
      const routerStub: Router = TestBed.inject(Router);
      jest.spyOn(matSnackBarStub, 'open').getMockImplementation();
      jest.spyOn(routerStub, 'navigate').getMockImplementation();
      let err: ISerializableException = httpErrorResponseStub.error;
      let message: string = err !== undefined ? err.message : '';
      expect(message).toEqual(`Message`);
      const val = service.handleError(httpErrorResponseStub);
      switch (httpErrorResponseStub.status) {
        // 4xx Client errors
        case 400:
        case 401:
          break;
        case 403:
          break;
        case 404:
          break;
        case 408:
          break;

        // Errors that indicate bugs
        case 405:
        case 410:
        case 411:
        case 415:
        case 431:
        case 505:
          break;

        // 5xx Server errors
        case 500:
          break;
        case 503:
          break;

        default:
          expect(val).toBeTruthy();
      }
    });
  });

  describe('defaultHeaderOptions', () => {
    it('makes expected calls', () => {
      service.currentUser = undefined;
      const val = service.defaultHeaderOptions();
      let headers: IHttpHeaders = {};
      headers['Content-Type'] = 'application/json';
      if (service.currentUser && service.currentUser.token) {
        headers['Authorization'] = `Bearer ${service.currentUser.token.value}`;
      }
      expect(val).toEqual(headers);
    });
  });

  describe('defaultHeaderOptions 2', () => {
    it('makes expected calls', () => {
      service.currentUser = <IAuthenticateResponse>{ token: {} };
      const val = service.defaultHeaderOptions();
      let headers: IHttpHeaders = {};
      headers['Content-Type'] = 'application/json';
      if (service.currentUser && service.currentUser.token) {
        headers['Authorization'] = `Bearer ${service.currentUser.token.value}`;
      }
      expect(val).toEqual(headers);
    });
  });

  describe('uploadHeaderOptions', () => {
    it('makes expected calls', () => {
      service.currentUser = undefined;
      const val = service.uploadHeaderOptions();
      let headers: IHttpHeaders = {};
      if (service.currentUser && service.currentUser.token) {
        headers['Authorization'] = `Bearer ${service.currentUser.token.value}`;
      }
      expect(val).toEqual(headers);
    });
  });

  describe('uploadHeaderOptions 2', () => {
    it('makes expected calls', () => {
      service.currentUser = <IAuthenticateResponse>{ token: {} };
      const val = service.uploadHeaderOptions();
      let headers: IHttpHeaders = {};
      if (service.currentUser && service.currentUser.token) {
        headers['Authorization'] = `Bearer ${service.currentUser.token.value}`;
      }
      expect(val).toEqual(headers);
    });
  });
});
