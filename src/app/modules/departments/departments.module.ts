import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentGridComponent } from './department-grid/department-grid.component';
import { DepartmentComponent } from './department/department.component';
import { DataGridModule } from 'src/app/library/modules/data-grid/data-grid.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentGridComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    DataGridModule,
    ReactiveFormsModule
  ]
})
export class DepartmentsModule { }
