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
    
>>>>>>> d7eba57a10ee4ef455eabed0db89f4523f0e7c2d
    this.orderService.getOrderById(this.uid).subscribe(
      data =>{
          this.data = data
          console.log(this.data)
      }
    )
  }
}
