import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cus-order',
  templateUrl: './cus-order.component.html',
  styleUrls: ['./cus-order.component.css']
})
export class CusOrderComponent implements OnInit {

  @Input() uid: any

  data: any

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    console.log(this.uid)
=======
    
>>>>>>> 7c1e6967335c065358385c3492be06b368619e9c
    this.orderService.getOrderById(this.uid).subscribe(
      data =>{
          this.data = data
          console.log(this.data)
      }
    )
  }
}
