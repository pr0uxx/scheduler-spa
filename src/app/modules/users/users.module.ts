import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserGridComponent } from './user-grid/user-grid.component';
import { DataGridModule } from 'src/app/library/modules/data-grid/data-grid.module';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    UserGridComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataGridModule
  ],
  exports: [
    UserGridComponent
  ]
})
export class UsersModule { }
