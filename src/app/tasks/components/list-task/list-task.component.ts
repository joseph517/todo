import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';
import { CardTaskComponent } from "../card-task/card-task.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardTaskComponent
],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.sass']
})
export class ListTaskComponent{

  public listTask: Task[] = this.taskService.getTask()
  public selectedState: string = 'all'
  
  filterListTask(): Task[] {
    if (this.selectedState === 'all') {
      return this.listTask
    }
    return this.listTask.filter( task => task.state == (this.selectedState === 'completed' ? true : false))
  }

  constructor(
    private taskService: TaskService
  ) { }
}
