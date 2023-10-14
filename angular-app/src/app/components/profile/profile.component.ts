import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id = localStorage.getItem('currentUser');
  customer: any;

  uid = localStorage.getItem('currentUser')?.split('id":"')[1].split('","')[0];

  customerEditForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    // role: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
  });

  constructor(private em: UserService) {
    const id = this.id?.split('id":"')[1].split('","')[0];

    this.getCustomerID(id);
  }

  ngOnInit(): void {}

  submit() {
    const e = JSON.parse(JSON.stringify(this.customerEditForm.value));
    console.log(e, this.uid);
    if (this.customerEditForm.invalid) {
      console.log(this.customerEditForm.invalid);
      return;
    }

    try {
      this.em
        .UpdateCustomerID(this.uid, e)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(data);
            alert('Edit Successfully!');
            location.reload();
          },
          (err) => {
            console.log(err);
            alert('Edit fail!');
          }
        );
    } catch (err) {
      console.log(err);
    }
  }

  getCustomerID(tid?: string) {
    try {
      this.em.getCustomerID(tid).subscribe(
        (data) => {
          this.customer = data;
          this.customerEditForm.patchValue({
            id: data?._id,
            // role: data?.role,
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
}
