import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyGridComponent } from './company-grid/company-grid.component';
import { DataGridModule } from 'src/app/library/modules/data-grid/data-grid.module';
import { CompanyComponent } from './company/company.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyGridComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    DataGridModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
