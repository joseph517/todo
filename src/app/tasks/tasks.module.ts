import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class TasksModule { }
