import { Component } from '@angular/core';
import { FormComponent } from "../../shared/components/form/form.component";

@Component({
  selector: 'app-form-application',
  standalone: true,
  imports: [
    FormComponent
],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class FormApplicationComponent {
}
