/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      handleError: (error) => ({}),
      defaultHeaderOptions: () => ({}),
      uploadHeaderOptions: () => ({}),
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub,
        },
      ],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
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

  describe('DELETE', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.DELETE(stringStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('GET', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.GET(stringStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('OPTIONS', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.OPTIONS(stringStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('PATCH', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const bodyStub: any = <any>{};
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.PATCH(stringStub, bodyStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('POST', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const bodyStub: any = <any>{};
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.POST(stringStub, bodyStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('POSTDOWNLOAD', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const bodyStub: any = <any>{};
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.POSTDOWNLOAD(stringStub, bodyStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('POSTUPLOAD', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const bodyStub: any = <any>{};
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.POSTUPLOAD(stringStub, bodyStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });

  describe('PUT', () => {
    it('makes expected calls', () => {
      const stringStub: string = '';
      const bodyStub: any = <any>{};
      const authenticationServiceStub: AuthenticationService = TestBed.inject(
        AuthenticationService
      );
      service.PUT(stringStub, bodyStub).subscribe(
        (_) => {},
        (_) => {
          expect(authenticationServiceStub.handleError).toHaveBeenCalled();
        }
      );
      httpMock.expectOne('');
    });
  });
});
