## Button Click

I usually expose observables that emits values when an action such as checkout is performed. In this way, the presentational component can map a button directly to the presenters method and not care about handling a returned valued. Instead, an output property is connected to the presenter’s observable property.

```html
<!-- heroes.component.html -->
<button (click)="addHero(heroName.value)">
  add
</button>
```

```ts
// heroes.component.ts
@Component({
  selector: 'app-heroes-ui',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroesPresenter],
})
export class HeroesComponent implements OnDestroy, OnInit {
  @Output() add: EventEmitter<string> = new EventEmitter();

  private destroy: Subject<void> = new Subject();

  constructor(private presenter: HeroesPresenter) {}

  ngOnInit(): void {
    this.presenter.add$
      .pipe(takeUntil(this.destroy))
      .subscribe((name) => this.add.emit(name));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addHero(name: string): void {
    this.presenter.addHero(name);
  }
}
```

```ts
// heroes.presenter.ts
export class HeroesPresenter {
  private add: Subject<string> = new Subject();
  add$: Observable<string> = this.add.asObservable();

  public addHero(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    this.add.next(name);
  }
}
```

## search.component.html

```html
<mat-form-field appearance="fill">
  <mat-icon matPrefix>search</mat-icon>
  <mat-label>Search</mat-label>
  <input
    #searchBox
    type="text"
    matInput
    placeholder="Search"
    [formControl]="viewSearchControl"
    (keyup)="viewSearchFor(searchBox.value)"
  />
</mat-form-field>
```

## search.component.ts

```ts
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Input() searchText: string;
  @Output() search: EventEmitter<string> = new EventEmitter();

  private destroy: Subject<void> = new Subject();

  viewSearchControl: FormControl;

  constructor(private presenter: SearchPresenter) {}

  ngOnInit(): void {
    this.presenter.searchTerms$
      .pipe(
        // complete when component is destroyed
        takeUntil(this.destroy)
      )
      .subscribe((term) => this.search.emit(term));
    this.viewSearchControl = new FormControl(this.searchText);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  viewSearchFor(term: string): void {
    this.presenter.search(term);
  }

  viewClearSearch() {
    this.viewSearchControl.setValue('');
    this.search.emit('');
  }
}
```

## search.presenter.ts

```ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable()
export class SearchPresenter {
  form = this.formBuilder.group({
    search: '',
  });

  private searchTerms: Subject<string> = new Subject();

  searchTerms$: Observable<string> = this.searchTerms.pipe(
    // if term length greater than 2
    filter((res) => res.length > 2),

    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore new term if same as previous term
    distinctUntilChanged()
  );

  search(term: string): void {
    this.searchTerms.next(term);
  }
  // initialData: CompletedTask;

  constructor(private formBuilder: FormBuilder) {}
}
```
