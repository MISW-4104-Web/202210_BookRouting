import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorialListComponent } from './editorial-list/editorial-list.component';


const routes: Routes = [{
  path: 'editorials',
  children: [
    {
      path: 'list',
      component: EditorialListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorialRoutingModule { }
