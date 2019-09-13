import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksPageComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
