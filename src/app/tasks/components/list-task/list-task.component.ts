import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.sass']
})
export class ListTaskComponent implements OnInit {

  public listTask: Task[] = this.taskService.getTask()
  public selectedState: string = ''
  
  filterListTask(): Task[] {
    if (this.selectedState === '') {
      return this.listTask
    }
    return this.listTask.filter( task => task.state == (this.selectedState === 'true'))
  }

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getTask()
    console.log(this.taskService.getTask())
  }
}
