import { Injectable } from '@angular/core';
import { shoes } from '../models/shoe';
import { ShoeService } from './shoe.service';

@Injectable({providedIn: 'root'})

export class CartService {
 
  counter: number = 0;
  sumPrice: number = 0;
  cart: shoes = [];
  cartid:any = [];

  constructor(private shoeService: ShoeService) { }


add(id: number){
  console.log('Add product id:'+id+' to cart');
  this.cart.push(this.shoeService.getSomeShoe(id))
  this.cartid.push(this.shoeService.getSomeShoe(id)._id)
  this.sumPrice += this.shoeService.getSomeShoe(id).price
  this.counter = this.cart.length;
  console.log(this.cart)
  console.log(this.cartid)

}
getCounter(){
  return this.counter;
}

getSumPrice(){
  return this.sumPrice}

getCart(){
  return this.cart;
}

getCartid(){
  return this.cartid;
}
}