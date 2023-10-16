import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ReviewService } from 'src/app/services/review.service';
import { review } from 'src/app/models/review';
import { ShoeService } from 'src/app/services/shoe.service';
import { shoe,shoes } from 'src/app/models/shoe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  shoes?: shoes
  orders: order[] = [];
  reviews: review[] = [];
  dataFromCart: any;
  uid: any

  constructor(
    private route: ActivatedRoute
    , private orderService: OrderService,
    private shoe: ShoeService,) { 
      this.uid = localStorage.getItem('_id')
    }

  ngOnInit(): void {

    
    // this.route.queryParams.subscribe((params) => {
    //   const data = params['data']; // ดึงข้อมูลจาก query parameters
    //   if (data) {
    //     this.dataFromCart = JSON.parse(data); // แปลง JSON string เป็น object ดิบ
    //     // ต่อไปคุณสามารถใช้ this.dataFromCart ในการแสดงข้อมูลใน OrderComponent


    //   }
    // });

    this.orderService.getOrderById(this.uid).subscribe(
      (data) => {
        this.orders = data;  
      })

 
  }

  onClick() {
    this.orders.forEach( element => {
      console.log(element.menuordering)
      element.menuordering.forEach( e =>{
        this.shoe.getShoeById(e).subscribe(
          result =>{
            if (result){}
              this.shoes?.push(result)
              
      
          }
        )
      })
    });
  }


}
