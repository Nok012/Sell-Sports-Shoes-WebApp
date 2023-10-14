import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: any

  constructor(private router: Router) { 
    this.role = localStorage.getItem('role')
  }

  ngOnInit(): void {
    
  }
  onClick() {
    this.router.navigate(['/shoe']);
  }

}
