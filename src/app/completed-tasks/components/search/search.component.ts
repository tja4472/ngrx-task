/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-generic-constructors */
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  input,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SearchPresenter } from './search.presenter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchPresenter],
})
export class SearchComponent implements OnDestroy, OnInit {
  searchText = input.required<string>();
  @Output() search: EventEmitter<string> = new EventEmitter();

  private destroy: Subject<void> = new Subject();

  get viewSearchControl() {
    return this.presenter.searchControl;
  }
  constructor(private presenter: SearchPresenter) {}

  ngOnInit(): void {
    this.presenter.searchTerms$
      .pipe(
        // complete when component is destroyed
        takeUntil(this.destroy)
      )
      .subscribe((term) => this.search.emit(term));
    // this.viewSearchControl = new FormControl(this.searchText);
    this.presenter.initialSearchTerm(this.searchText());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  viewClearSearch() {
    // this.viewSearchControl.setValue('');
    // this.search.emit('');
    this.presenter.clearSearch();
  }
}
