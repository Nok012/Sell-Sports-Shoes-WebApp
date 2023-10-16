import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-cus-review',
  templateUrl: './cus-review.component.html',
  styleUrls: ['./cus-review.component.css']
})
export class CusReviewComponent implements OnInit {

  @Input() name: any

  data: any

  constructor(private reviewService: ReviewService) {
    
   }

  ngOnInit(): void {

    this.reviewService.getReviewByName(this.name).subscribe(
      data =>{
        this.data = data
        console.log(data.length)
      }
    )
  }

}
