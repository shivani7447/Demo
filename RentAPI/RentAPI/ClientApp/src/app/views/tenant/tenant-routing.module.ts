import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';


const routes: Routes = [
  {
    path: '',
    component: TenantListComponent,
    data: {
      title: 'Tenant'
    }
  },
  {
    path: 'add',
    component: TenantFormComponent,
    data: {
      title: 'Tenant'
    }
  },
  {
    path: 'edit/:id',
    component: TenantFormComponent,
    data: {
      title: 'Tenant'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule {}
