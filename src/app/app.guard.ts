import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Subject } from 'rxjs';

@Injectable()
export class AppGuard implements CanActivate {
  public componentDestroyed: Subject<boolean> = new Subject<boolean>();
  public isLoggedIn = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    this.isLoggedIn = this.authService.isLoggedIn(true);
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    return this.isLoggedIn;
  }
}
