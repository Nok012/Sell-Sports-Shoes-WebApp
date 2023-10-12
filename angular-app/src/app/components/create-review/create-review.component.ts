import { Component, Input, OnInit } from '@angular/core';
import { review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { ShoeService } from "src/app/services/shoe.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  id = localStorage.getItem('currentUser');
  name = this.id?.split('name":"')[1].split('","')[0];
  customer: any;
  shoes: any;
  shoeNames: string[] = []; // Store the list of shoe names
  previewLoaded: boolean = false;
  ListReview: any;

  reviewForm = new FormGroup({
    shoeName: new FormControl('', [Validators.required]),
    username: new FormControl(this.name, [Validators.required]),
    rating: new FormControl(0, [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    img: new FormControl(''),
    datePosted: new FormControl(new Date(), [Validators.required]),
  });

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
  ) {
    const id = this.id?.split('id":"')[1].split('","')[0];

    this.shoeService.getShoe().subscribe((shoes) => {
      this.shoeNames = shoes.map((shoe: { name: any; }) => shoe.name); // Use 'name' instead of 'id'
    });
    this.getCustomerID(id);
    this.onLoading()
  }

  ngOnInit(): void {
  }

  // =========== get data ===========

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

  get shoeName() {
    return this.reviewForm.get('shoeName');
  }

  get customerEmail() {
    return this.reviewForm.get('customerEmail');
  }

  get rating() {
    return this.reviewForm.get('rating');
  }

  get comment() {
    return this.reviewForm.get('comment');
  }

  get img() {
    return this.reviewForm.get('img');
  }

  get datePosted() {
    return this.reviewForm.get('datePosted');
  }

  // =========== upload single image ===========

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.reviewForm.patchValue({
          img: reader.result as any,
        });
      };
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

  // =========== submit button ===========

  submitReview() {
    console.log(this.name)
    this.reviewForm.patchValue({
      username: this.name,
      datePosted: new Date(),
      rating: this.selectedRating
    });

    // =========== edit error alert message ===========
    let msg = ""
    const shoeNameControl = this.reviewForm.get('shoeName');
    const commentControl = this.reviewForm.get('comment');

    if (shoeNameControl) {
      const shoeNameValue = shoeNameControl?.value;

      if (!shoeNameValue) {
        msg += '[Product is required] '
      }
    }
    if (this.selectedRating == 0) {
      msg += '[The minimum rating is 1] '
    }

    if (commentControl) {
      const commentValue = commentControl?.value;

      if (commentValue && commentValue.length > 300) {
        msg += '[Comment cannot exceed 300 characters] '
      } else if (!commentValue) {
        msg += '[Comment is required] '
      }
    }

    // =========== submit ===========

    if (this.reviewForm.status == 'VALID') {
      var jsonObject: any = JSON.parse(JSON.stringify(this.reviewForm.value));
      this.reviewService.addReview(jsonObject);
      this.reviewService.submitStatus = true;

    } else {
      this.reviewService.submitStatus = false;
    }

    // // =========== show alert message ===========

    if (this.reviewService.submitStatus) {
      alert('Successful');
      this.resetForm();
    } else {
      alert('The process was unsuccessful: ' + msg)
    }
  }

  // =========== reload for reset data in field ===========

  resetForm() {
    window.location.reload()
  }

  // =========== loading before page ===========

  onLoading() {
    try {
      this.shoeService.getShoe().subscribe(
        (data) => {
          this.shoes = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  // =========== update shoeName after click select ===========

  updateShoeName(selectedShoe: string) {
    this.reviewForm.patchValue({
      shoeName: selectedShoe
    });
  }

  // =========== navigate ===========

  goBack() {
    this.router.navigate(['/review']);
  }

  goAddReview() {
    this.router.navigate(['review/new']);
  }

}
