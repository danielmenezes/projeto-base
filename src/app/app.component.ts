import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './design-system/components/input/input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { startsWithValidator } from './design-system/validators/starts-with.validator';
import { cpfValidator } from './design-system/validators/cpf.validator';
import { TableComponent } from './design-system/components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, MatFormFieldModule, InputComponent, TableComponent],
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
      userName: [{ value: '', disabled: false }, [Validators.required, cpfValidator]], 
    });
  }

  mostrarErros() {
    this.showMessageError = true;
    console.log(this.form.controls['userName'].value)
  }

  columns = [
    { key: 'name', label: 'Nome', editable: false },
    { key: 'age', label: 'Idade', editable: true },
    { key: 'city', label: 'Cidade', editable: false },
  ];

  dados = [
    { name: 'João', age: 25, city: 'São Paulo' },
    { name: 'Maria', age: 30, city: 'Rio de Janeiro' },
    { name: 'Pedro', age: 35, city: 'Belo Horizonte' },
    { name: 'Ana', age: 28, city: 'Curitiba' },
    { name: 'Lucas', age: 40, city: 'Porto Alegre' },
    { name: 'Carla', age: 23, city: 'Florianópolis' },
    { name: 'Fernanda', age: 33, city: 'Salvador' },
    { name: 'Rafael', age: 29, city: 'Recife' },
  ];


}
