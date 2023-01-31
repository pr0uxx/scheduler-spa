import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  routeSubscription?: Subscription;
  id?: number;
  componentVersion?: 'Create' | 'Update';

  userForm = new FormGroup({
    
  })

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe({
      next: params => {
        this.id = params['id'];
        this.componentVersion = this.id ? 'Update' : 'Create'
    },
      error: e => console.error(e)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

}
