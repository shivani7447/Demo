import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';


const routes: Routes = [
  {
    path: '',
    component: ItemListComponent,
    data: {
      title: 'Item'
    }
  },
  {
    path: 'add',
    component: ItemFormComponent,
    data: {
      title: 'Item'
    }
  },
  {
    path: 'edit/:id',
    component: ItemFormComponent,
    data: {
      title: 'Item'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}
