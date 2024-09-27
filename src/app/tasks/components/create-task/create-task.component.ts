import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task, User } from '../../interfaces/task';

@Component({
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass']
})
export class CreateTaskComponent implements OnInit {



  ngOnInit(): void {
    this.taskService.task$.subscribe((task: Task[]) => {
      console.log(task)
    })
  }
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) { }

  // Form to create task
  public createTaskForm: FormGroup = this.fb.group({
    name_task: new FormControl('', [Validators.required, Validators.minLength(5)]),
    deadline: new FormControl('', [Validators.required]),
    state: new FormControl(false),
    users: this.fb.array([], [Validators.required])
  })

  // Form to create user on task form
  public newUser: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    skills: this.fb.array([], [Validators.required])
  })

  // Field to add new skill on user form
  public newSkill: FormControl = this.fb.control('', [Validators.required, Validators.minLength(3)])

  get users() {
    return this.createTaskForm.get('users') as FormArray
  }

  get skills() {
    return this.newUser.get('skills') as FormArray
  }

  addUser() {
    if (this.newUser.invalid) return
    if (this.skills.length === 0) return
    const newUser = this.newUser.value
    const userExist = this.users.value.find((user: User) => user.name === newUser.name)
    if (userExist) {
      console.log('El nombre ya existe')
      return
    }
    this.users.push(
      this.fb.group({
        name: newUser.name,
        age: newUser.age,
        skills: this.fb.array(newUser.skills)
      })
    )

    this.skills.clear()
    this.newUser.reset()
  }

  addSkill() {
    if (this.newSkill.invalid) return
    const newSkill = this.newSkill.value

    const skillExist = this.skills.value.find((skill: string) => skill === newSkill)
    if (skillExist) {
      console.log('La habilidad ya existe')
      return
    }

    this.skills.push(
      this.fb.control(newSkill, [Validators.required, Validators.minLength(3)])
    )

    this.newSkill.reset()
  }

  removeSkill(i: number) {
    this.skills.removeAt(i)
  }

  removeUser(i: number) {
    this.users.removeAt(i)
  }

  getFieldErrorInForm(form: FormGroup, field: string): string | null {

    if (!this.isValidFieldInForm(form, field)) return null

    const errors = form.controls[field].errors || {}
    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`

        case 'min':
          return `Debe ser mayor a ${errors['min'].min}`
      }
    }
    return null
  }

  getFieldErrorSkill(field: string): string | null {

    if (!this.isInValidFieldSkill(field)) return null

    const errors = this.newSkill.errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return null
  }

  isValidFieldInForm(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched
  }

  isValidFieldTask(field: string) {
    return this.isValidFieldInForm(this.createTaskForm, field)
  }

  isValidFieldUser(field: string) {
    return this.isValidFieldInForm(this.newUser, field)
  }

  isInValidFieldSkill(field: string) {
    return this.newSkill.touched && this.newSkill.invalid
  }

  getFieldErrorTask(field: string) {
    if (!this.isValidFieldTask(field)) return null

    return this.getFieldErrorInForm(this.createTaskForm, field)
  }

  getFieldErrorUser(field: string) {
    if (!this.isValidFieldUser(field)) return null
    return this.getFieldErrorInForm(this.newUser, field)
  }

  onSubmit() {
    if (this.createTaskForm.invalid) return

    console.log(this.createTaskForm)

    this.taskService.addTask(this.createTaskForm.value)


    // Reset all form
    this.createTaskForm.reset()
    this.newUser.reset()
    this.skills.clear()
    this.users.clear()

    // Remove touch
    this.createTaskForm.markAsUntouched()
    this.newUser.markAsUntouched()
    this.skills.markAsUntouched()
    this.users.markAsUntouched()



  }

}