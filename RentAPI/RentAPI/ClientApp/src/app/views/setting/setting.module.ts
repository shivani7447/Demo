import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    FormsModule,CommonModule,
    SettingRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,HttpClientModule,
  ],
  declarations: [
   ProfileComponent
     ]
   
})
export class SettingModule { }
