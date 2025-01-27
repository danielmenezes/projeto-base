import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './design-system/components/input/input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { startsWithValidator } from './design-system/validators/starts-with.validator';
import { cpfValidator } from './design-system/validators/cpf.validator';
import { TableComponent } from './design-system/components/table/table.component';
import { ColumnsTableModel } from './design-system/components/table/table.model';
import { DatepickerComponent } from './design-system/components/datepicker/datepicker.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    ReactiveFormsModule, 
    FormsModule, 
    MatFormFieldModule, 
    InputComponent, 
    TableComponent, 
    DatepickerComponent
  ],
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
      date: [{ value: [
        new Date(), 
        new Date()
      ], disabled: false }, [Validators.required]], 
    });
  }

  mostrarErros() {
    this.showMessageError = true;
    console.log(this.form.controls['date'].value)
  }

  columns: ColumnsTableModel[] = [
    { key: 'name', label: 'Nome', editable: false },
    { 
      key: 'age', 
      label: 'Idade', 
      editable: true,
      editableFieldConfig: {
        type: 'coin',
        max: 999.99,
        min: -999.99,
        allowNegativeNumbers: true
      }
    },
    { key: 'city', label: 'Cidade', editable: false },
    { 
      key: 'date', 
      label: 'Data', 
      editable: true,
      editableFieldConfig: {
        type: 'calendar'
      }
    },
  ];

  dados = [
    { name: 'João', age: 25, city: 'São Paulo', date: null },
    { name: 'Maria', age: 30, city: 'Rio de Janeiro' },
    { name: 'Pedro', age: 35, city: 'Belo Horizonte' },
    { name: 'Ana', age: 28, city: 'Curitiba' },
    { name: 'Lucas', age: 40, city: 'Porto Alegre' },
    { name: 'Carla', age: 23, city: 'Florianópolis' },
    { name: 'Fernanda', age: 33, city: 'Salvador' },
    { name: 'Rafael', age: 29, city: 'Recife' },
  ];


}
