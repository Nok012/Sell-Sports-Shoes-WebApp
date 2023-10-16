import { Injectable } from '@angular/core';
import { review, reviews } from '../models/review';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}
  
  private reviews: review[] = [];

  review: any;
  category?: reviews[];
  submitStatus = false;

  getReviewsForShoe(shoeName: number): review[] {
    return this.reviews.filter(review => review.shoeName === shoeName);
  }

  addReview(data: any) {
    return this.http
      .post<review>('http://localhost:3000/review/create', data)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitStatus = true;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.submitStatus = false;
        },
      });
  }

  getReview() {
    return this.http.get<reviews>('http://localhost:3000/review/gets').pipe(
      map((data) => {
        if (data) {
          this.review = data;
          console.log(this.review);
        }
        return this.review;
      })
    );
  }

  getReviewById(id:any) {
    return this.http.get<review>('http://localhost:3000/review/get/'+ id).pipe(
      map((data) => {
        if (data) {
          this.review = data;
          console.log(this.review);
        }
        return this.review;
      })
    );
  }

  deleteReviewById(id: any) {
    return this.http
      .delete<review>('http://localhost:3000/review/delete/'+ id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
