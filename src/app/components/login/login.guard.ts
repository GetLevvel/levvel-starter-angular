import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subject } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate, OnDestroy {
  public componentDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn(true);
    /* istanbul ignore next */
    if (isLoggedIn) {
      this.router.navigate(['/']);
    }

    return !isLoggedIn;
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }
}
