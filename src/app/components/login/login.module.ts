import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LoginRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
