import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [

    {
        path: 'list-task',
        component: ListTaskComponent
    },
    {
        path: 'create-task',
        component: CreateTaskComponent
    },

    {
        path: '**',
        redirectTo: 'create-task'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }