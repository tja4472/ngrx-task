import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { CompletedTask } from '@app/root-store/tasks-store/models';

@Component({
  selector: 'app-completed-task-list',
  templateUrl: './completed-task-list.component.html',
  styleUrls: ['./completed-task-list.component.css'],
})
export class CompletedTaskListComponent implements OnInit {
  @Input()
  currentTasks: CompletedTask[];

  @Output() toggleCompleteItem = new EventEmitter<CompletedTask>();

  constructor() {}

  ngOnInit() {}

  viewTrackBy(index, item: CompletedTask) {
    return item.id;
  }
}
