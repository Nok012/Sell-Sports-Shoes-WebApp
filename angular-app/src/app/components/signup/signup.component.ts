import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @Input() signup!: string;

  customerForm = new FormGroup({
    CusID: new FormControl('', [Validators.required, Validators.pattern('C[0-9]{2}')]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
  });

  p = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private cus: UserService) {}

  ngOnInit(): void {
    console.log(this.signup);
  }

  Check(p1: any, p2: any) {
    var b = true;
    if (p1 === p2) {
      b = false;
    } else {
      b = true;
    }
    console.log(p1, p2);
    return b;
  }

  submit() {
    const e = JSON.parse(JSON.stringify(this.customerForm.value));

    if (this.Check(e.password, this.p.value)) {
      alert('Passwords do not match');
      return;
    }
    if (this.customerForm.invalid) {
      alert('Sign Up invalid!');
      return;
    }

    try {
      this.cus.addCustomer(e).subscribe(
        (data) => {
          console.log(data);
          alert('Sign Up Successfully!');
          location.reload();
        },
        (err) => {
          console.log(err);
          alert('Sign Up fail!');
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  get CusID() {
    return this.customerForm.get('CusID');
  }
  get name() {
    return this.customerForm.get('name');
  }
  get password() {
    return this.customerForm.get('password');
  }

  get email() {
    return this.customerForm.get('email');
  }

  get tel() {
    return this.customerForm.get('tel');
  }
}
