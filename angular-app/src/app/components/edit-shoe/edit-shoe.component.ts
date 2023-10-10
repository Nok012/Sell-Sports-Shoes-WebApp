import { Component, OnInit } from '@angular/core';
import { ShoeService } from 'src/app/services/shoe.service';
import { Router } from '@angular/router';
import { shoe } from 'src/app/models/shoe';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-shoe',
  templateUrl: './edit-shoe.component.html',
  styleUrls: ['./edit-shoe.component.css']
})
export class EditShoeComponent implements OnInit {

  id: any
  data?: shoe
  mesage: any
  alert?: boolean = false

  shoeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100000),
    ]),
    type: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern('[10-99]{1}'),
    ]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
  });

  shoeType: string[] = ['Men', 'Women'];
  shoeCategory: string[] = ['Soccer', 'Basketball', 'Running'];
  shoeSize: string[] = ['US 5','US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'];

  previewLoaded: boolean = false;

  
 

  constructor(private router: Router, private shoe: ShoeService) {
    
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id')
    this.shoe.getShoeById(this.id).subscribe( data =>{
    this.data = data
    // this.shoeForm.value.img = data.img
    this.shoeForm.patchValue(data)
    })    
  }


  onCancle(){
    this.router.navigate(['/manage'])
  }
  onSubmit (){
    this.shoe.UpdateShoeByID(this.id,this.shoeForm.value).subscribe(result =>{
      if (result){}
        this.alert = true
        this.mesage = result
        // console.log(this.mesage.mesage)

    })
    
    setTimeout(() => {
      this.alert = false
      setTimeout(() =>{
        this.router.navigate(['/manage'])
      },1000)
     
    },2000)
    
  }



  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.shoeForm.patchValue({
          img: reader.result as any,
        });
      };
    }
  }

  get name() {
    return this.shoeForm.get('name');
  }

  get price() {
    return this.shoeForm.get('price');
  }
  get type() {
    return this.shoeForm.get('type');
  }

  get size() {
    return this.shoeForm.get('size');
  }
  get category() {
    return this.shoeForm.get('category');
  }

  get quantity() {
    return this.shoeForm.get('quantity');
  }
  get file() {
    return this.shoeForm.get('file');
  }
  get img() {
    return this.shoeForm.get('img');
  }
  get detail() {
    return this.shoeForm.get('detail');
  }

}
