import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { shoe, shoes } from '../models/shoe';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {


  constructor(private http: HttpClient) {}

  shoe: any;
  category?: shoes[];
  submitStatus = false;

  getShoe() {
    return this.http.get<shoes>('http://localhost:3000/shoe/gets').pipe(
      map((data) => {
        if (data) {
          this.shoe = data;
          console.log
          console.log(this.shoe);
        }
        return this.shoe;
      })
    );
  }

  getShoeById(id:any) {
    return this.http.get<shoe>('http://localhost:3000/shoe/get/'+ id).pipe(
      map((data) => {
        if (data) {
          this.shoe = data;
          console.log
          console.log(this.shoe);
        }
        return this.shoe;
      })
    );
  }

  getSomeShoe(id: number) {
    return this.shoe[id];
  }

  addShoe(data: any) {
    return this.http
      .post<shoe>('http://localhost:3000/shoe/create', data)
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

  deleteShoeById(id: any) {
    return this.http
      .delete<shoe>('http://localhost:3000/shoe/delete/'+ id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  UpdateShoeByID(id: any,data: any) {
    console.log(1)
    return   this.http
      .put('http://localhost:3000/shoe/update/' + id, data)
      .pipe(
        map((data) => {
          if (data) {
            console.log(data);
          }
          return data;
        })
      );
  }

  UpdateShoeQuantity(data: any) {
    return this.http
      .put('http://localhost:3000/shoe/updates/quantity', data)
      .pipe(
        map((data) => {
          if (data) {
            console.log(data);
          }
          return data;
        })
      );
  }

}
