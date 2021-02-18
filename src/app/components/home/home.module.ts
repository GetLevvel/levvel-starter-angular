import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, FlexLayoutModule, HomeRoutingModule],
})
export class HomeModule { }
