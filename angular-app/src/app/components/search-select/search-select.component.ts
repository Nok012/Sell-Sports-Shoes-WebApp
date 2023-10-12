import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})
export class SearchSelectComponent {
  @Input() options: string[] = [];
  @Input() shoeName: string | null = null;

  @Output() shoeNameSelected = new EventEmitter<string>();

  searchTerm: string = '';
  filteredOptions: string[] = [];
  showDropdown: boolean = false;

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.showDropdown = true;
  }

  selectOption(option: string) {
    this.searchTerm = option;
    this.showDropdown = false;
    this.shoeNameSelected.emit(option);
  }
}
