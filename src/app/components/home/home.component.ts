import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutDialog } from '../dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy, OnInit {
  public componentDestroyed: Subject<boolean> = new Subject();
  public title = 'levvel-starter-angular';

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((data: { data: any }) => {});
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  public openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialog);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result) => {
        if (result) {
          this.router.navigateByUrl('/logout');
        }
      });
  }
}
