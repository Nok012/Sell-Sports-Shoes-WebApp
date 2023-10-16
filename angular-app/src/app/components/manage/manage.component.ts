import { Component, OnInit } from '@angular/core';
import { ShoeService } from 'src/app/services/shoe.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  ListShoe: any;
  status?: any;
  shoeId: any
  constructor(private router: Router, private shoe: ShoeService) {}

  ngOnInit(): void {
    this.onLoading();
  }

  deleteShoe(item: any) {
    this.shoe.deleteShoeById(item);
    window.location.reload()
  }
  onClickEdit(item: any) {
    localStorage.setItem('id',item)
    this.router.navigate(['/editshoe']);
  }

  selectShoe(item: any){
    this.shoeId = item
  }

  onClick() {
    this.router.navigate(['/addshoe']);
  }
  onLoading() {
    try {
      this.shoe.getShoe().subscribe(
        (data) => {
          this.ListShoe = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onRowClick(row: any) {
    console.log(row._id);
    this.status = row._id;
  }
}
