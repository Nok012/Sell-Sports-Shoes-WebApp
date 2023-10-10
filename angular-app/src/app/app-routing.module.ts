import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoeComponent } from './components/shoe/shoe.component';
import { OrderComponent } from './components/order/order.component';
import { AddshoeComponent } from './components/addshoe/addshoe.component';
import { EditShoeComponent } from './components/edit-shoe/edit-shoe.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'shoe', component: ShoeComponent },
  { path: 'addshoe', component: AddshoeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editshoe', component: EditShoeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
