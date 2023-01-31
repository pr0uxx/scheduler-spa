import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/abstractions/data-transfer/i-company';
import { CrudService } from 'src/app/generics/crud-service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  routeSubscription?: Subscription;
  id?: number;
  componentVersion?: 'Create' | 'Update';
  company?: ICompany;

  companyForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(50), Validators.required])
  })

  get name() { return this.companyForm.get('name') }

  constructor(
    private route: ActivatedRoute,
    @Inject('companyService') private companyService: CrudService<ICompany>,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe({
      next: params => {
        this.id = params['id'];
        this.componentVersion = this.id ? 'Update' : 'Create'
        if (this.componentVersion === 'Update')
        {
          this.getCompany();
        }
      },
      error: e => console.error(e)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  getCompany() {
    if (this.id) {
      this.companyService.getById(this.id).subscribe({
        next: value => {
          this.company = value;
          this.updateForm(value);
        },
        error: e => console.error(e)
      })
    }
    else console.error('id not provided');
  }

  updateForm(company: ICompany){
    this.name?.setValue(company.name);
  }

  onSubmit(): void {
    const company: ICompany = {
      name: this.name!.value!,
      createdDateUtc: new Date(),
      createdBy: ''
    };

    this.companyService.post(company).subscribe({
      next: value => this.router.navigate([value.id]),
      error: e => console.error(e)
    })
  }
}
