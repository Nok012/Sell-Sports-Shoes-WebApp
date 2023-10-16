import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  uid: any
  name: any
  data?: user
  open: boolean = false

  constructor(private customer: UserService, private router: Router) { }

  ngOnInit(): void {

    this.uid = localStorage.getItem('uid')
    this.customer.getCustomerID(this.uid).subscribe( data =>{
       this.data = data
       this.name = data.name
    })

    setTimeout(() =>{
      this.open = true
    },1000)

  }

  onClick(){
    this.router.navigate(['/manage/customer'])
  }

}
