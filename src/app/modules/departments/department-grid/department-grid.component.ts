import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IDepartment } from 'src/app/abstractions/data-transfer/i-department';
import { CrudService } from 'src/app/generics/crud-service';
import { DataGrid } from 'src/app/library/modules/data-grid/classes/data-grid';
import { ButtonGroupColumn, GridColumn } from 'src/app/library/modules/data-grid/classes/grid-column';

@Component({
  selector: 'app-department-grid',
  templateUrl: './department-grid.component.html',
  styleUrls: ['./department-grid.component.scss']
})
export class DepartmentGridComponent implements OnInit {

  departments?: IDepartment[];

  grid = new DataGrid([
    new GridColumn({ property: "name", label: "Name" }),
    new ButtonGroupColumn({}, [
      {
        label: 'Edit',
        cssClass: 'btn btn-info btn-sm',
        buttonAction: (row: IDepartment) => this.router.navigate(['departments', 'department', row.id])
      },
      {
        label: 'Delete',
        cssClass: 'btn btn-danger btn-sm',
        buttonAction: (row: IDepartment) => {
          if (row.id) {
            this.departmentService.delete(row.id).subscribe({
              next: () => {
                const index = this.departments?.findIndex(x => x.id === row.id);
                if (index && index > -1){
                  this.departments?.splice(index);
                }
              }
            })
          }
        }
      }
    ])
  ])

  constructor(
    @Inject('departmentService') private departmentService: CrudService<IDepartment>,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.departments = await firstValueFrom(this.departmentService.get());
  }
}
