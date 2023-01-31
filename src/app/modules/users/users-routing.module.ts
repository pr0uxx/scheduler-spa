import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserGridComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
