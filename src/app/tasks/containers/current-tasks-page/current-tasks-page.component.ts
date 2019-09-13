import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-current-tasks-page',
  templateUrl: './current-tasks-page.component.html',
  styleUrls: ['./current-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksPageComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
