import { Component, Inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from 'src/app/abstractions/data-transfer/i-user';
import { CrudService } from 'src/app/generics/crud-service';
import { DataGrid } from 'src/app/library/modules/data-grid/classes/data-grid';
import { ConvertedGridColumn, GridColumn } from 'src/app/library/modules/data-grid/classes/grid-column';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  users?: IUser[];
  grid = new DataGrid([
    new ConvertedGridColumn({
      property: "firstName",
      label: "Name",
      conversionFunc: (row: IUser) => `${row.firstName} ${row.surname}`
    }),
    new GridColumn({ property: "surname", label: "Surname" }),
    new GridColumn({ property: "department", label: "Department" }),
    new GridColumn({ property: "position", label: "Position" }),
    new GridColumn({ property: "weeklyHours", label: "Hours" })
  ]);

  constructor(@Inject('userService') private userService: CrudService<IUser>) {
  }

  async ngOnInit(): Promise<void> {
    this.users = await firstValueFrom(this.userService.get());
  }

}
