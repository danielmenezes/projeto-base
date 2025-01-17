import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './design-system/components/input/input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, MatFormFieldModule, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'projeto-base';
  form: FormGroup;
  max = 10
  showMessageError = false

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: [{ value: '', disabled: false }, [Validators.required]], 
    });
  }

  mostrarErros() {
    this.showMessageError = true;
    console.log(this.form.controls['userName'].value)
  }


}
