import { Component, OnInit } from '@angular/core';
import { ShoeService } from 'src/app/services/shoe.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.css']
})
export class ShoeComponent implements OnInit{

  ListShoe: any;
  Category = ['All', 'Soccer', 'Basketball', 'Running'];
  constructor(
    private shoe: ShoeService,
    private router: Router,
    private cartService: CartService
  ) {
    this.onLoading();
  }

  c = new FormControl('All', [Validators.required]);
  check = 'M';
  ShoeData: any;

  ngOnInit(): void {
    this.ShoeData = '';
  }

  onLoading() {
    try {
      this.shoe.getShoe().subscribe(
        (data) => {
          this.ListShoe = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onCheck() {
    if (this.c.value == '' || this.c.value == 'All') {
      this.check = 'M';
    } else {
      this.check = 'W';
    }
    return this.check;
  }

  onClick() {
    this.router.navigate(['/addshoe']);
  }

  addToCart(id: number) {
    this.shoe.getSomeShoe(id).quantity -= 1;
    this.cartService.add(id);
  }
  
  onClickViewShoe(i: any) {
    console.log(i);
    this.ShoeData = i;
  }

}