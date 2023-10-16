import { Component, NgModule, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  ListCustomers: any;
  customerId: any

  constructor(private customer: UserService, private router: Router) { this.onLoading(); }

  ngOnInit(): void {
    
  }

  onClick(item:any) {
    this.router.navigate(['manage/customer/detail']);
    localStorage.setItem('uid',item)
  }

  onLoading() {
    try {
      this.customer.getRoleCustomer().subscribe(
        (data) => {
          this.ListCustomers = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  selectCustomer(item: any){
    this.customerId = item
  }

  deleteCustomer(item: any) {
    this.customer.deleteUserById(item);
    window.location.reload()
  }
}