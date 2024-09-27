import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../interfaces/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TaskService {

  public listTask: Task[] = [
    {
      id: 1, name_task: 'Tarea 1', deadline: new Date('2024-03-16'), users: [{
        name: 'Juan',
        age: '22',
        skills: [
          'Angular',
          'Javascript',
          'Typescript'
        ]
      },
      {
        name: 'Pedro',
        age: '19',
        skills: [
          'Angular',
          'Javascript',
          'Typescript'
        ]
      }],
      state: false
    },
    {
      id: 2, name_task: 'Tarea 2', deadline: new Date('2024-03-17'), users: [{
        name: 'Ana',
        age: '55',
        skills: [
          'React',
          'Vue',
        ]
      }],
      state: false
    },
    {
      id: 3, name_task: 'Tarea 3', deadline: new Date('2024-03-18'), users: [{
        name: 'Luis',
        age: '43',
        skills: [
          'Python',
          'C#',
          'Java'
        ]
      }],
      state: false
    }
  ];
    constructor() { }

    private task: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.listTask)
    readonly task$ = this.task.asObservable()

    getTask(): Task[] {
      return this.task.getValue()
    }

    addTask(task: Task): void {
      const tasks = [...this.task.getValue(), task]
      this.task.next(tasks)
    }

    setCompleted(id: number): void {
      this.task.next(
        this.task.getValue().map( task => {
          if(task.id === id) {
            task.state = !task.state
          }
          return task
        })
      )
    }

    deleteTask(id: number): void {
      const tasks = this.task.getValue().filter( task => task.id !== id)
      this.task.next(tasks)
    }


}