/// <reference types="jest" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginComponent, MyErrorStateMatcher } from './login.component';
import {
  IAuthenticateUserQuery,
  SerializableException,
  IAuthenticateResponse,
} from 'src/app/models/servicemodels';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Form, FormGroupDirective } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const metaStub = () => ({ updateTag: (object) => ({}) });
    const titleStub = () => ({ setTitle: (string) => ({}) });
    const renderer2Stub = () => ({ setStyle: (arg, string, string1) => ({}) });
    const routerStub = () => ({ navigateByUrl: (string) => ({}) });
    const authenticationServiceStub = () => ({
      login: (iAuthenticateUserQuery) => ({
        pipe: () => ({ subscribe: (f) => f({}) }),
      }),
    });
    const helperServiceStub = () => ({
      toggleLoading: { next: () => ({}), value: {} },
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: Meta, useFactory: metaStub },
        { provide: Title, useFactory: titleStub },
        { provide: Renderer2, useFactory: renderer2Stub },
        { provide: Router, useFactory: routerStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('MyErrorStateMatcher', () => {
    it('isErrorState makes expected calls', () => {
      const isErrorState = (MyErrorStateMatcher.prototype.isErrorState = jest.fn());
      const controlStub: FormControl = <FormControl>{
        invalid: true,
        dirty: true,
        touched: true,
      };
      const formStub: FormGroupDirective = <FormGroupDirective>{
        submitted: true,
      };
      const myErrorStateMatcher = new MyErrorStateMatcher();

      myErrorStateMatcher.isErrorState(controlStub, formStub);

      expect(isErrorState).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const metaStub: Meta = fixture.debugElement.injector.get(Meta);
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      jest.spyOn(metaStub, 'updateTag').getMockImplementation();
      jest.spyOn(titleStub, 'setTitle').getMockImplementation();
      component.ngOnInit();
      expect(metaStub.updateTag).toHaveBeenCalled();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      const renderer2Stub: Renderer2 = fixture.debugElement.injector.get(
        Renderer2
      );
      jest.spyOn(renderer2Stub, 'setStyle').getMockImplementation();
      component.ngAfterViewInit();
      expect(renderer2Stub.setStyle).toHaveBeenCalled();
    });
  });
});
