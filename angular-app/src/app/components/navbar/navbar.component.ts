import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { login } from 'src/app/models/login';
import { CartService } from 'src/app/services/cart.service';
import { shoes } from 'src/app/models/shoe';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser?: login;

  uid = localStorage.getItem('currentUser')?.split('id":"')[1].split('","')[0];
  role: any
  cart: shoes = [];
  n?: string;
  constructor(
    private router: Router,
    private login: LoginService,
    private cartService: CartService,
    private cus: UserService
  ) {
    this.login.currentUser.subscribe((x) => (this.currentUser = x));
    this.role = localStorage.getItem('role')
    this.cart = this.cartService.getCart();
    this.getCustomerID(this.uid);
  }

  ngOnInit(): void {
    
    console.log(this.role)
  }

  getCustomerID(tid?: string) {
    try {
      this.cus.getCustomerID(tid).subscribe(
        (data) => {
          this.n = data?.name;
          console.log(this.n);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
    
  }

  getCounter() {
    return this.cartService.getCounter();
  }

  getSumPrice() {
    return this.cartService.getSumPrice();
  }

}
