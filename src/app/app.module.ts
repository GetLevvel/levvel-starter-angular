import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { LogoutDialog } from './components/dialogs/logout-dialog/logout-dialog.component';
import { AppGuard } from './app.guard';
import { LoginGuard } from './components/login/login.guard';
import { RoutingModule } from './app.routing';
import {
  AuthenticationService,
  LogoutPopupComponent,
} from './services/authentication.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, LogoutDialog, LogoutPopupComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    RoutingModule,
    MatProgressBarModule,
    MatSnackBarModule,
    RoutingModule,
  ],
  providers: [AppGuard, LoginGuard, AuthenticationService],
})
export class AppModule {}
