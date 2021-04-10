import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaDetailComponent } from './area-detail/area-detail.component';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaListComponent } from './area-list/area-list.component';


const routes: Routes = [
  {
    path: '',
    component: AreaListComponent,
    data: {
      title: 'Area'
    }
  },
  {
    path: 'add',
    component: AreaFormComponent,
    data: {
      title: 'Area'
    }
  },
  {
    path: 'edit/:id',
    component: AreaFormComponent,
    data: {
      title: 'Area'
    }
  },
  {
    path: 'detail/:id',
    component: AreaDetailComponent,
    data: {
      title: 'Area'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule {}
