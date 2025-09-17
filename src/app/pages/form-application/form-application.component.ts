import { Component } from '@angular/core';
import { FormComponent } from "../../shared/components/form/form.component";

@Component({
  selector: 'app-form-application',
  standalone: true,
  imports: [
    FormComponent
],
  templateUrl: './form-application.component.html',
  styleUrl: './form-application.component.scss'
})
export class FormApplicationComponent {
}
