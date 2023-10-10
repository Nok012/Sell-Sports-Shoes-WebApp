import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { users, user } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  customers: any;
  customer: any;

  getCustomer() {
    return this.http.get<users>('http://localhost:3000/user/gets').pipe(
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
      .get<user>('http://localhost:3000/user/get/' + tid)
      .pipe(
        map((data) => {
          if (data) {
            this.customer = data;
            console.log(this.customer);
          }
          return this.customer;
        })
      );
  }

  UpdateCustomerID(tid?: string, d?: any) {
    return this.http
      .put<user>('http://localhost:3000/user/update' + tid, d)
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
