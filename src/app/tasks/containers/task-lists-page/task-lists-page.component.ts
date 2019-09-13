import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListsPageComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
