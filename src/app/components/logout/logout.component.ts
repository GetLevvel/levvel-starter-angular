import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { BootController } from '../../../boot-control';

@Component({
  selector: 'logout',
  template: ``,
})
export class LogoutComponent implements OnDestroy, OnInit {
  public componentDestroyed: Subject<boolean> = new Subject();

  constructor(
    private authService: AuthenticationService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  public ngOnInit(): void {
    if (this.authService.currentUser) {
      this.authService
        .logout()
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((_) => {
          this.ngZone.runOutsideAngular(() =>
            BootController.getBootControl().restart()
          );
          this.router.navigateByUrl('/login');
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }
}
