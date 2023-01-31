import {HttpClient, HttpClientModule} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ICompany } from './abstractions/data-transfer/i-company';
import { IDepartment } from './abstractions/data-transfer/i-department';
import { IUser } from './abstractions/data-transfer/i-user';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ACrudService, CrudService, crudServiceProvider} from './generics/crud-service';
import { NavbarComponent } from './shared/navigation/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    crudServiceProvider.getProvider<IUser>('user'),
    crudServiceProvider.getProvider<ICompany>('company'),
    crudServiceProvider.getProvider<IDepartment>('department')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
