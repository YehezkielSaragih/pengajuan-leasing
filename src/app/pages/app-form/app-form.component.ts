import { Component } from '@angular/core';
import { FormComponent } from "../../shared/components/form/form.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-form-application',
  standalone: true,
  imports: [
    FormComponent,
    SidebarComponent
],
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.scss'
})
export class AppFormComponent {
}
