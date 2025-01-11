/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-generic-constructors */
import {
  Component,
  OnDestroy,
  OnInit,
  input,
  output,
  inject,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SearchPresenter } from './search.presenter';
import {
  MatFormField,
  MatPrefix,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchPresenter],
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatPrefix,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
    MatSuffix,
  ],
})
export class SearchComponent implements OnDestroy, OnInit {
  private presenter = inject(SearchPresenter);

  searchText = input.required<string>();
  search = output<string>();

  private destroy: Subject<void> = new Subject();

  get viewSearchControl() {
    return this.presenter.searchControl;
  }

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
