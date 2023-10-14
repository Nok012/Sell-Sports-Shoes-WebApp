import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<login>;
  public currentUser: Observable<login>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<login>(
      JSON.parse(localStorage.getItem('currentUser') as any)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signIn(dataLogin: any) {
    return this.http
      .post<any>('http://localhost:3000/login/signin', dataLogin)
      .pipe(
        map((data) => {
          if (data && data.token) {
            window.localStorage.setItem('token', data?.token);
            window.localStorage.setItem(
              'currentUser',
              JSON.stringify(data?.result)
            );
            localStorage.setItem('role',data?.result.role)
          }
          return data;
        })
      );
  }

  public get currentUserValue(): login {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null as any);
  }
}
