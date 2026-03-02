import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

/**
 * There are different ways to provide a service in Angular. The most common way is to use the @Injectable decorator with the providedIn
 * property set to 'root'. This means that the service will be available application-wide and there will be only one instance of it (singleton).
 *
 * Another way to provide a service is to add it to the providers array of a component. This means that the service will be available
 * only within that component and its children, and there will be a new instance of the service for each component that provides it.
 *
 * In this case, we want the TasksService to be available application-wide, so we use the providedIn: 'root' option in the @Injectable decorator.
 * This way, we can inject the TasksService into any component that needs it, and we will always get the same instance of the service.
 *
 * Different injectors in Angular have different lifecycles. The root injector is created when the application starts and is destroyed when
 * the application is destroyed. The component injector is created when the component is created and is destroyed when the component is destroyed.
 * The module injector is created when the module is loaded and is destroyed when the module is unloaded. The service injector is created when
 * the service is created and is destroyed when the service is destroyed.
 *
 * @Injectable uses application root (Environment injector)
 * Module injector is used by providing the service named in the providers array of a module.
 * Platform Environment injector is used by providing the service named in the providers array of a platform. (Add an object to the providers
 * array of the platform when bootstrapping the application).
 */

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
