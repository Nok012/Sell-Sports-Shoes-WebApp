import { Component, OnInit, Input } from '@angular/core';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  shoe!: ShoeService;
  showChild!: boolean;

  @Input() ShoeData!: any;
  constructor() {}

  ngOnInit(): void {}
}
