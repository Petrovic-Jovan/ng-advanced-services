import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  /**
   * It is common practice not to expose the writable signal directly, but to create a read-only version of it and expose that instead.
   * This way, we can ensure that the state can only be modified through the methods provided by the service,
   * and not directly from outside the service.
   */
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    // We should not mutate the old array, but create a new one with the new task added
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }
}
