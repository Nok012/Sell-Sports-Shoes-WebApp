import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { oders, oder } from '../models/oder';

@Injectable({
  providedIn: 'root'
})
export class OderService {

  constructor(private http: HttpClient) { }

  oders: any;
  oder: any

  getOders() {
    return this.http.get<oders>('http://localhost:3000/oder/gets').pipe(
      map((data) => {
        if (data) {
          console.log(data);
        }
        return data;
      })
    );
  }

  getOderById(tid?: string) {
    return this.http
      .get<oder>('http://localhost:3000/oder/get/' + tid)
      .pipe(
        map((data) => {
          if (data) {
            data
            console.log(data);
          }
          return data;
        })
      );
  }

  updateOderById(id?: string, data?: any) {
    return this.http
      .put<oder>('http://localhost:3000/oder/update' + id, data)
      .pipe(
        map((data) => {
          if (data) {
            console.log(data);
          }
          return data;
        })
      );
  }
  
  deleteOderById(id?: string) {
    return this.http
      .delete<oder>('http://localhost:3000/oder/delete' + id)
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
