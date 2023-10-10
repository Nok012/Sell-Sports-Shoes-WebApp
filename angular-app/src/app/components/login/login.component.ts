import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl?: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  show!: boolean;
  signup!: string;

  constructor(
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.login.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.show = false;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signIn() {
    this.submitted = true;
    //console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.login
      .signIn(this.loginForm.value)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        if (data.status) {
          alert('คุณ ' + data?.result?.name + ' เข้าสู่ระบบเรียบร้อยแล้ว');
          this.router.navigate([this.returnUrl]);
          //this.router.navigate(['/']);
          location.reload();
        } else {
          alert('อีเมลและรหัสผ่านไม่ถูกต้อง');
          this.loading = false;
        }
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onClick() {
    this.show = !this.show;
    if (this.show) {
      this.signup = "signup"
    }
  }
}
