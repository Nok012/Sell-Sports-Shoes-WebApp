import { Component, Input, OnInit } from '@angular/core';
import { review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { HttpClient } from "@angular/common/http";
import { ShoeService } from "src/app/services/shoe.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  id = localStorage.getItem('currentUser');
  email = this.id?.split('email":"')[1].split('","')[0];
  customer: any;
  shoes: any;
  shoeNames: string[] = [];
  previewLoaded: boolean = false;
  ListReview: any;
  reviews: review[] = [];

  customerEditForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
  });

  constructor(
    private reviewService: ReviewService,
    private em: UserService,
    private shoeService: ShoeService,
    private router: Router
    )
  {
    const id = this.id?.split('id":"')[1].split('","')[0];
    console.log(this.email)

    this.shoeService.getShoe().subscribe((shoes) => {
      this.shoeNames = shoes.map((shoe: { name: any; }) => shoe.name); // Use 'name' instead of 'id'
    });
    this.getCustomerID(id);
    this.onLoading()
  }

  ngOnInit(): void {}

  // =========== loading before page ===========

  onLoading() {
    try {
      this.reviewService.getReview().subscribe(
        (data) => {
          this.reviews = data;
          this.commentStates = Array(data.length).fill(false);
        },
        (err) => {
          console.log(err);
        }
      );

      this.shoeService.getShoe().subscribe(
        (data) => {
          this.shoes = data;
        },
        (err) => {
          console.log(err);
        }
      );

      this.commentStates = Array(this.reviews.length).fill(false); // Initialize to 'false' for each review
    } catch (err) {
      console.log(err);
    }
  }

  // =========== get data ===========

  getReview() {
    this.reviewService.getReview().subscribe(
      (data) => {
        this.reviews = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCustomerID(tid?: string) {
    try {
      this.em.getCustomerID(tid).subscribe(
        (data) => {
          this.customer = data;
          this.customerEditForm.patchValue({
            id: data?._id,
            role: data?.role,
            name: data?.name,
            gender: data?.gender,
            email: data?.email,
            tel: data?.tel,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  
  // =========== rating star ===========

  hoveredRating = 0;
  selectedRating = 0;

  setRating(rating: number) {
    this.selectedRating = rating;
  }
  
  resetStars() {
    this.hoveredRating = 0;
  }
  
  highlightStars(rating: number) {
    this.hoveredRating = rating;
  }

  // =========== navigate ===========

  goAddReview() {
    this.router.navigate(['review/new']);
  }
  
  
  // =========== toggle comment (show more/show less)===========
  
  commentStates: boolean[] = new Array(this.reviews.length).fill(false);

  toggleComment(index: number) {
    this.commentStates[index] = !this.commentStates[index];
  }

  // =========== slice comment for new line ===========

  addNewLinesToComment(comment: string): string {
    if (comment.length < 36) {
      return comment;
    } else {
      const lines = comment.match(/.{1,36}/g);
      return lines ? lines.join('<br>') : comment;
    }
  }

  // =========== reverse review for last submitted ===========

  getReversedReviews() {
    return this.reviews.slice().reverse();
  }

  // =========== filter search ===========

  shoeNameFilter: string = '';
  filteredReviews: any[] = [];
  filterReviews() {
    this.filteredReviews = this.reviews.filter((review) => {
      return review.shoeName.toLowerCase().includes(this.shoeNameFilter.toLowerCase());
    });
  }
}

