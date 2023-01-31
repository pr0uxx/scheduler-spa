import { Injectable } from '@angular/core';
import { IUser } from '../abstractions/data-transfer/i-user';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { 
    this.generateUsers();
  }

  generateUsers(count: number = 100): void{
    this.generatedUsers = [];

    for (let i = 0; i < count; i++) {
      this.generatedUsers.push({
        firstName: faker.name.firstName(),
        surname: faker.name.lastName(),
        department: faker.name.jobArea(),
        position: faker.name.jobTitle(),
        weeklyHours: 40
      });
    }
  }

  generatedUsers: IUser[] = [];

  getUsers(search?: {property: string, value: string | number}){
    if (!search) return of(this.generatedUsers);
    
    return of(this.generatedUsers.filter(x => {
      const y = x as any;
      if (Object.prototype.hasOwnProperty.call(x, search.property)) return false;
      const s : string = y[search.property];
        return s.includes(search.value.toString());
    }));
  }
}
