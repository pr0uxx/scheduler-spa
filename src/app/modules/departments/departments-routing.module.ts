import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentGridComponent } from './department-grid/department-grid.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  { path: '', component: DepartmentGridComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'department/:id', component: DepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
