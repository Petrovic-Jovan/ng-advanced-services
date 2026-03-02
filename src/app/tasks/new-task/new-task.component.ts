import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  /* We inject the TasksService to be able to call the addTask method when the form is submitted
   The difference between private and public is that private means that the property can only be
   accessed within the class, while public means that it can be accessed from outside the class as well.
   In this case, we only need to access the tasksService from within the class, so we can make it private.
  */
  constructor(private tasksService: TasksService) {}

  onAddTask(title: string, description: string) {
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
