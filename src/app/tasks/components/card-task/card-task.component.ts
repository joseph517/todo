import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, User } from '../../interfaces/task';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'task-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.sass']
})
export class CardTaskComponent {

  @Input() task!: Task;

}
