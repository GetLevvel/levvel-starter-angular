import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutDialog } from '../dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public componentDestroyed: Subject<boolean> = new Subject();
  public title = 'levvel-starter-angular';

  constructor(public dialog: MatDialog, private router: Router) {}

  public openLogoutDialog() {
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
