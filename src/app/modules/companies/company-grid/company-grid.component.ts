import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ICompany } from 'src/app/abstractions/data-transfer/i-company';
import { CrudService } from 'src/app/generics/crud-service';
import { DataGrid } from 'src/app/library/modules/data-grid/classes/data-grid';
import { ButtonGroupColumn, GridColumn } from 'src/app/library/modules/data-grid/classes/grid-column';

@Component({
  selector: 'app-company-grid',
  templateUrl: './company-grid.component.html',
  styleUrls: ['./company-grid.component.scss']
})
export class CompanyGridComponent implements OnInit {

  companies?: ICompany[];

  grid = new DataGrid([
    new GridColumn({ property: "name", label: "Name" }),
    new ButtonGroupColumn({}, [
      {
        label: 'Edit',
        cssClass: 'btn btn-info btn-sm',
        buttonAction: (row: ICompany) => this.router.navigate(['companies', 'company', row.id])
      },
      {
        label: 'Delete',
        cssClass: 'btn btn-danger btn-sm',
        buttonAction: (row: ICompany) => {
          if (row.id) {
            this.companyService.delete(row.id).subscribe({
              next: () => {
                const index = this.companies?.findIndex(x => x.id === row.id);
                if (index && index > -1){
                  this.companies?.splice(index);
                }
              }
            })
          }
        }
      }
    ])
  ])

  constructor(
    @Inject('companyService') private companyService: CrudService<ICompany>,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.companies = await firstValueFrom(this.companyService.get());
  }
}
