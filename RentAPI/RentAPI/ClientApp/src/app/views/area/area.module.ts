import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaRoutingModule } from './area-routing.module';
import { AreaDetailComponent } from './area-detail/area-detail.component';


@NgModule({
  imports: [
    FormsModule,CommonModule,
    AreaRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,HttpClientModule,
  ],
  declarations: [
    AreaListComponent,
    AreaFormComponent,
    AreaDetailComponent
     ]
   
})
export class AreaModule { }
