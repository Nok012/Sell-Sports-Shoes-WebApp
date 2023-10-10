import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { order, orderModel } from '../models/order';
import { ShoeService } from './shoe.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private cartService: CartService, private shoeService: ShoeService) {}

  orders: any;
  order?: orderModel[];
  
  submitStatus = false;

  


  getOrder() {
    return this.http.get<order>('http://localhost:3000/api/order').pipe(
      map((data) => {
        if (data) {
          this.orders = data;
          console.log(this.orders);
        }
        return this.orders;
      })
    );
  }

  getSomeOrder(id: any){
    return this.orders[id]
  }

  addOrder(data: any) {
    return this.http.post<any>('http://localhost:3000/api/addorder', data).pipe(
      map((data) => {
        return data;
      })
    ).subscribe({
      next: data => {
          console.log(data)
          this.submitStatus = true;
          alert("Success");
          location.reload();
      },
      error: error => {
          console.error('There was an error!', error);
          this.submitStatus = false;
      }
  });
  }

  deleteOrder(id: number) {
    return this.http.delete('http://localhost:3000/deleteorder/deleteorder/'+id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

}