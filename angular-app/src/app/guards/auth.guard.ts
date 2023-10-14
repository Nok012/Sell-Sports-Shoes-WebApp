import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private login: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const  currentUser = this.login.currentUserValue;
    if(currentUser){
      if ( (state.url === '/manage' || state.url === '/editshoe') && localStorage.getItem('role') !== 'Admin'){
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
      }
      
      return true ;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
