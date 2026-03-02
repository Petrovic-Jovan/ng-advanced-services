import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  // Another way of injecting the services
  private tasksService = inject(TasksService);

  selectedFilter = signal<string>('all');
  /**
   * After injecting the service, tasks is a writable signal. If we want to make it read-only, we need to protect it with a getter
   * and return the value of the signal. This way, we can only read the value of the signal, but we cannot modify it directly.
   * We can only modify it through the methods provided by the service.
   *
   * We change tasks to computed() signal to be able to filter the tasks based on the selected filter. The computed() signal will
   * automatically re-evaluate whenever the selectedFilter or the tasks signal changes.
   */
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
