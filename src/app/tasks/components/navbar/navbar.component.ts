import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';


@Component({
  standalone: true,
  selector: 'tasks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  imports: [
    AppRoutingModule,    
  ]
})
export class NavbarComponent {

}
