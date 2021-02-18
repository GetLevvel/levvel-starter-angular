import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import {
  IAuthenticateUserQuery,
  IAuthenticateResponse,
  ISerializableException,
  SerializableException,
} from '../../models/servicemodels';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  /* istanbul ignore next */
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    /* istanbul ignore next */
    const isSubmitted = form && form.submitted;
    /* istanbul ignore next */
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  public componentDestroyed: Subject<boolean> = new Subject();
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthenticationService,
    private metaTagService: Meta,
    private renderer: Renderer2,
    private router: Router,
    private titleService: Title
  ) {}

  public ngOnInit(): void {
    this.titleService.setTitle('SMM - Login');
    this.metaTagService.updateTag({
      name: 'description',
      content: 'Spectrum Media Manager - Login Screen',
    });
    this.metaTagService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  public ngAfterViewInit(): void {
    this.renderer.setStyle(
      document.querySelector('body'),
      'overflow',
      'hidden'
    );
  }

  public ngOnDestroy(): void {
    this.renderer.destroy();
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(<IAuthenticateUserQuery>{
          username: String(this.loginForm.controls['username'].value).trim(),
          password: String(this.loginForm.controls['password'].value),
        })
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(
          (result: IAuthenticateResponse | ISerializableException) => {
            if (result instanceof SerializableException) {
            } else {
              this.renderer.setStyle(
                document.querySelector('body'),
                'overflow',
                'unset'
              );
              this.router.navigateByUrl('/');
            }
          },
          (_: HttpErrorResponse) => {}
        );
    }
  }
}
