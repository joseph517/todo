import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../interfaces/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TaskService {
    constructor() { }

    
    private task: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])
    readonly task$ = this.task.asObservable()

    isValidField(form: FormGroup, field: string ): boolean | null {
        return form.controls[field].errors && form.controls[field].touched
    }

    getFieldError(form: FormGroup, field: string): string | null {
  
      const errors = form.controls[field].errors as { [key: string]: any }
      for (const key of Object.keys(errors)) {
  
        switch(key){
          case 'required':
            return 'Este campo es requerido'
  
          case 'minlength':
            return `Minimo ${ errors['minlength'].requiredLength } caracteres`
          
          case 'min':
            return `Debe ser mayor a ${ errors['min'].min }`
        }
  
      }
  
      return null
  
    }

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