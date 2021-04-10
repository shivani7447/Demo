import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { TenantRoutingModule } from './tenant-routing.module';


@NgModule({
  imports: [
    FormsModule,CommonModule,
    TenantRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,HttpClientModule,
  ],
  declarations: [
    TenantListComponent,TenantFormComponent
     ]
   
})
export class TenantModule { }
