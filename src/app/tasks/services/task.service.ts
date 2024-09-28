import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({providedIn: 'root'})
export class TaskService {

  public listTask: Task[] = [
    {
      id: uuidv4(), name_task: 'Tarea 1', deadline: new Date('2024-03-16'), users: [{
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
      id: uuidv4(), name_task: 'Tarea 2', deadline: new Date('2024-03-17'), users: [{
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
      id: uuidv4(), name_task: 'Tarea 3', deadline: new Date('2024-03-18'), users: [{
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
      task.id = uuidv4()
      const tasks = [...this.task.getValue(), task]
      this.task.next(tasks)
    }

    toggleState(id: string): void {
      this.task.next(
        this.task.getValue().map( task => {
          if(task.id === id) {
            task.state = !task.state
          }
          return task
        })
      )
    }
}