import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, User } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'task-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.sass']
})
export class CardTaskComponent {

  @Input() task!: Task;
  constructor(  private taskService: TaskService) { }

  toggleState(): void {
    this.taskService.toggleState(this.task.id)
  }

}
