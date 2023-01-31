import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyGridComponent } from './company-grid/company-grid.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: '', component: CompanyGridComponent },
  { path: 'company', component: CompanyComponent},
  { path: 'company/:id', component: CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
