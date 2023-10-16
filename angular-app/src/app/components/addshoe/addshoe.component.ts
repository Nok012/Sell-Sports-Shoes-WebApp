import { Component, OnInit } from '@angular/core';
import { ShoeService } from 'src/app/services/shoe.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-addshoe',
  templateUrl: './addshoe.component.html',
  styleUrls: ['./addshoe.component.css'],
})
export class AddshoeComponent implements OnInit {
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

  shoeType: string[] = ['', 'Men', 'Women'];
  shoeCategory: string[] = ['', 'Soccer', 'Basketball', 'Running'];
  shoeSize: string[] = ['','US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'];


  previewLoaded: boolean = false;

  constructor(private shoeService: ShoeService) {}

  ngOnInit(): void {}

  onSubmit() {
    var jsonObject: any = JSON.parse(JSON.stringify(this.shoeForm.value));
    //console.log(jsonObject);

    if (this.shoeForm.status == 'VALID') {
      this.shoeService.addShoe(jsonObject);
      this.shoeService.submitStatus = true;
    }

    if (this.shoeService.submitStatus) {
      alert('บันทึกสำเร็จ');
      this.shoeForm.reset();
    } else {
      alert('บันทึกไม่สำเร็จ');
    }

    //
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
  resetForm() {
    this.shoeForm.reset();
    this.previewLoaded = false;
  }
}
