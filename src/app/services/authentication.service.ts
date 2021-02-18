import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injectable, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Observable,
  of,
  Subject,
  throwError as observableThrowError,
} from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import {
  IAuthenticateResponse,
  IAuthenticateUserQuery,
  ISerializableException,
} from '../models/servicemodels';
import { IHttpHeaders } from './http.service';

@Injectable()
export class AuthenticationService implements OnDestroy {
  public componentDestroyed: Subject<boolean> = new Subject();
  public currentUser: IAuthenticateResponse;
  private globalSnackBar: MatSnackBarRef<SimpleSnackBar>;
  private logoutPopupTimeout: number;
  private logoutPopupSnackBar: MatSnackBarRef<LogoutPopupComponent>;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // set currentUser if saved in local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.checkTokenExpiration();

    this.logoutPopupTimeout = window.setInterval(
      () => this.handleLogoutPopup(),
      30 * 1000
    );
  }

  public ngOnDestroy(): void {
    clearInterval(this.logoutPopupTimeout);
    if (this.logoutPopupSnackBar) {
      this.logoutPopupSnackBar.dismiss();
    }

    if (this.globalSnackBar) {
      this.globalSnackBar.dismiss();
    }

    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  public login(
    auth: IAuthenticateUserQuery
  ): Observable<IAuthenticateResponse | ISerializableException> {
    // return this.POST('/api/users/authenticate', auth).pipe(
    //   tap((resp) => this.handleAuthResponse(resp))
    // );
    return of(<IAuthenticateResponse>{
      userInfo: <any>{
        id: 0,
        email: '',
        username: 'admin',
        isActive: true,
        isAdmin: true,
      },
      token: <any>{
        value: '',
        expiresAt: new Date(2058, 11, 24, 10, 33, 30, 0),
      },
    }).pipe(
      tap((resp) =>
        this.handleAuthResponse(<IAuthenticateResponse>{
          userInfo: <any>{
            id: 0,
            email: '',
            username: 'admin',
            isActive: true,
            isAdmin: true,
          },
          token: <any>{
            value: '',
            expiresAt: new Date(2058, 11, 24, 10, 33, 30, 0),
          },
        })
      )
    );
  }

  /* istanbul ignore next */
  private checkTokenExpiration() {
    if (!this.currentUser) {
      return;
    }

    if (
      this.currentUser.token &&
      new Date(this.currentUser.token.expiresAt) <= new Date()
    ) {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    }
  }

  /* istanbul ignore next */
  private handleAuthResponse(resp: IAuthenticateResponse): void {
    // Set currentUser property
    this.currentUser = resp;

    // Store username and token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    if (this.globalSnackBar) {
      this.globalSnackBar.dismiss();
    }
  }

  /* istanbul ignore next */
  private handleLogoutPopup(): void {
    if (!this.currentUser) {
      return;
    }

    const minutes =
      (new Date(this.currentUser.token.expiresAt).getTime() - Date.now()) /
      (60 * 1000);
    if (minutes <= 0) {
      if (this.logoutPopupSnackBar) {
        this.logoutPopupSnackBar.dismissWithAction();
      }
      this.logoutAndRedirect();
    } else if (minutes <= 10) {
      const msg = `You will be logged out in ${Math.floor(minutes)} minutes`;
      if (this.logoutPopupSnackBar) {
        this.logoutPopupSnackBar.instance.message = msg;
      } else {
        this.logoutPopupSnackBar = this.snackBar.openFromComponent(
          LogoutPopupComponent,
          {
            data: msg,
          }
        );
        this.logoutPopupSnackBar
          .onAction()
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(() => {
            this.logoutPopupSnackBar = undefined;
          });
      }
    }
  }

  public isAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.userInfo.isAdmin;
    } else {
      return false;
    }
  }

  public isLoggedIn(checkExpiration: boolean = false): boolean {
    if (checkExpiration) {
      this.checkTokenExpiration();
    }

    return !!this.currentUser;
  }

  public logout(): Observable<boolean> {
    // Clear currentUser remove user from local storage to log user out
    this.currentUser = null;
    localStorage.removeItem('currentUser');

    // Ensure the popup is removed

    if (this.logoutPopupSnackBar) {
      this.logoutPopupSnackBar.dismiss();
      this.logoutPopupSnackBar = null;
    }

    if (this.globalSnackBar) {
      this.globalSnackBar.dismiss();
    }

    return of(true);
  }

  public logoutAndRedirect(): void {
    this.logout()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((_) => {
        this.router.navigateByUrl('/login');
      });
  }

  public refreshToken(): void {
    this.POST('/api/users/refreshtoken', null)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((resp) => {
        this.handleAuthResponse(resp);
      });
  }

  // HTTP helpers

  public handleError(
    error: HttpErrorResponse
  ): Observable<ISerializableException> {
    let duration: number = 5000;
    let err: ISerializableException = error.error;
    let message: string = err !== undefined ? err.message : '';
    let action = 'Close';
    let onAction: Function;

    if (!navigator.onLine) {
      this.globalSnackBar = this.snackBar.open(
        'Your internet appears to be down',
        action,
        {
          duration: 20000,
        }
      );
    }

    switch (error.status) {
      // 4xx Client errors
      case 400:
      case 401:
        action = 'Login';

        if (this.router.url !== '/login') {
          duration = 0;
        }
        this.logout();

        const router = this.router;
        onAction = function () {
          router.navigate(['/login']);
        };
        break;
      case 403:
        message = 'You are not allowed to do this!';
        break;
      case 404:
        message = "The server couldn't find the resource you requested.";
        break;
      case 408:
        message = 'Request timed out.';
        break;

      // Errors that indicate bugs
      case 405:
      case 410:
      case 411:
      case 415:
      case 431:
      case 505:
        message = 'Oops, an error occured! Please submit a bug report';
        action = 'Report!';
        onAction = function () {
          location.href = 'mailto:contact@levvel.io';
        };
        break;

      // 5xx Server errors
      case 500:
        message = 'Fatal error on our end.';
        break;
      case 503:
        message = 'Service unavailable. Updating / Overloaded.';
        break;

      default:
        return observableThrowError(err);
    }

    // Show snack Snackbar
    this.globalSnackBar = this.snackBar.open(message, action, {
      duration: duration,
    });

    if (onAction != null) {
      this.globalSnackBar
        .onAction()
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(() => {
          onAction();
        });
    }

    // Throw the Observable for the request
    return observableThrowError(err);
  }

  public defaultHeaderOptions(): IHttpHeaders {
    let headers: IHttpHeaders = {};
    headers['Content-Type'] = 'application/json';
    if (this.currentUser && this.currentUser.token) {
      headers['Authorization'] = `Bearer ${this.currentUser.token.value}`;
    }
    return headers;
  }

  public uploadHeaderOptions(): IHttpHeaders {
    let headers: IHttpHeaders = {};
    if (this.currentUser && this.currentUser.token) {
      headers['Authorization'] = `Bearer ${this.currentUser.token.value}`;
    }
    return headers;
  }

  /* istanbul ignore next */
  private POST(passedUrl: string, body: any): Observable<any> {
    return this.http
      .post(passedUrl, JSON.stringify(body), {
        headers: this.defaultHeaderOptions(),
      })
      .pipe(
        takeUntil(this.componentDestroyed),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }
}

@Component({
  selector: 'auth-service-logout-popup',
  templateUrl: 'popups/logoutpopup.component.html',
})
export class LogoutPopupComponent {
  constructor(
    private authService: AuthenticationService,
    private snackbarRef: MatSnackBarRef<LogoutPopupComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public message: string
  ) {}

  public refresh(): void {
    this.snackbarRef.dismissWithAction();
    this.authService.refreshToken();
  }

  public logout(): void {
    this.snackbarRef.dismissWithAction();
    this.authService.logoutAndRedirect();
  }
}
