import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  { path: 'shifts', loadChildren: () => import('./modules/shifts/shifts.module').then(m => m.ShiftsModule) },
  { path: 'companies', loadChildren: () => import('./modules/companies/companies.module').then(m => m.CompaniesModule) },
  { path: 'departments', loadChildren: () => import('./modules/departments/departments.module').then(m => m.DepartmentsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
