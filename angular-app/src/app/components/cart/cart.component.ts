import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormControl, Validators } from '@angular/forms';

import { orderModel } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  date!: Date;
  constructor(
    private cart: CartService,
    private order: OrderService,
    private router: Router
  ) {
    setInterval(() => {
      setInterval(() => {
        this.date = new Date();
      }, 1000);
    });
  }

  data: orderModel = [];

  money = new FormControl(0, [Validators.required]);
  sum = 0;

  ngOnInit(): void {}

  getCart() {
    return this.cart.getCart();
  }

  getSumPrice() {
    return this.cart.getSumPrice();
  }

  getCounter() {
    return this.cart.getCounter();
  }

  getChangePrice() {
    var m = this.money.value;
    var p = this.getSumPrice();
    return Number(m) - p;
  }

  onSubmit() {
    var m = this.money.value;
    console.log(Number(m) < this.cart.getSumPrice());
    // const menuorderingData = this.cart.getCartid();
    if (
      this.cart.getCartid().length === 0 ||
      Number(m) < this.cart.getSumPrice()
    ) {
      this.order.submitStatus = false;
      alert('There was an error!');
      return;
    }
    this.data.push({
      userId: localStorage.getItem('_id'),
      menuordering: this.cart.getCartid(),
      sumprice: this.cart.getSumPrice(),
      time: new Date(),
    });


    var jsonObject: any = JSON.parse(JSON.stringify(this.data));
    console.log(jsonObject);

    this.order.addOrder(jsonObject[0]);
    this.order.submitStatus = true;
    // this.router.navigate(['/order'], {
    //   queryParams: { data: JSON.stringify(this.data) },
      
    // });
  }
}