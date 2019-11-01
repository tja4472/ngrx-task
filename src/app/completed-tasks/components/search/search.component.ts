import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() searchText = '';

  @Output() search = new EventEmitter<string>();

  viewSearchControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.viewSearchControl = new FormControl(this.searchText);
  }

  viewClearSearch() {
    this.viewSearchControl.setValue('');
    this.search.emit('');
  }
}
