import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Todo } from '@app/tasks/models';

@Component({
  selector: 'app-current-task-list-item',
  templateUrl: './current-task-list-item.component.html',
  styleUrls: ['./current-task-list-item.component.css'],
})
export class CurrentTaskListItemComponent implements OnInit {
  @Input() currentTask: Todo;

  @Output() completeChange = new EventEmitter<MatCheckboxChange>();

  constructor() {}

  ngOnInit() {}
}
