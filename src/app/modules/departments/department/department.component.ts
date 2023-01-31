import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICompany } from 'src/app/abstractions/data-transfer/i-company';
import { IDepartment } from 'src/app/abstractions/data-transfer/i-department';
import { CrudService } from 'src/app/generics/crud-service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  routeSubscription?: Subscription;
  id?: number;
  componentVersion?: 'Create' | 'Update';
  department?: IDepartment;
  companies?: ICompany[];

  departmentForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(50), Validators.required]),
    companyId: new FormControl<number | null>(null, [Validators.required])
  })

  get name() { return this.departmentForm.get('name') }
  get companyId() { return this.departmentForm.get('companyId') }

  constructor(
    private route: ActivatedRoute,
    @Inject('departmentService') private departmentService: CrudService<IDepartment>,
    @Inject('companyService') private companyService: CrudService<ICompany>,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe({
      next: params => {
        this.id = params['id'];
        this.componentVersion = this.id ? 'Update' : 'Create'
        if (this.componentVersion === 'Update') {
          this.getDepartment();
        }
      },
      error: e => console.error(e)
    });

    this.companyService.get().subscribe({
      next: value => this.companies = value,
      error: e => console.error(e)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  getDepartment() {
    if (this.id) {
      this.departmentService.getById(this.id).subscribe({
        next: value => {
          this.department = value;
          this.updateForm(value);
        },
        error: e => console.error(e)
      })
    }
    else console.error('id not provided');
  }

  updateForm(department: IDepartment) {
    this.name?.setValue(department.name);
    this.companyId?.setValue(department.companyId);
  }

  onSubmit(): void {
    const department: IDepartment = {
      id: this.department?.id,
      name: this.name!.value!,
      companyId: this.companyId!.value!,
      createdDateUtc: new Date(),
      createdBy: '',
      updatedBy: ''
    };

    this.componentVersion == 'Create' ? this.create(department) : this.update(department);
  }

  create(department: IDepartment) {
    this.departmentService.post(department).subscribe({
      next: value => this.router.navigate([value.id]),
      error: e => console.error(e)
    });
  }

  update(department: IDepartment) {
    this.departmentService.update(department).subscribe({
      next: value => {
        this.department = value;
        this.departmentForm.markAsPristine();
      },
      error: e => console.error(e)
    });
  }
}
