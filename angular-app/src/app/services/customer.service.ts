import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { cusModel, customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(private http: HttpClient) {}

  customers: any;
  customer?: cusModel[];

  cus?: customer;

  getCustomer() {
    return this.http.get<customer>('http://localhost:3000/api/customer').pipe(
      map((data) => {
        if (data) {
          this.customers = data;
          console.log(this.customers);
        }
        return this.customers;
      })
    );
  }

  getCustomerID(tid?: string) {
    return this.http
      .get<customer>('http://localhost:3000/api/customer/' + tid)
      .pipe(
        map((data) => {
          if (data) {
            this.cus = data;
            console.log(this.customer);
          }
          return this.cus;
        })
      );
  }

  UpdateCustomerID(tid?: string, d?: any) {
    return this.http
      .put<customer>('http://localhost:3000/api/customer/' + tid, d)
      .pipe(
        map((data) => {
          if (data) {
            console.log(data);
          }
          return data;
        })
      );
  }
  addCustomer(d: any) {
    return this.http.post<any>('http://localhost:3000/login/signup', d).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
