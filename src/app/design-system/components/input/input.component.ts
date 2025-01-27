import { Component, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';

type MatInputType =
  | 'color'
  | 'number'
  | 'password'
  | 'search'
  | 'text'
  | 'time'
  | 'coin';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [provideNgxMask()]
})
export class InputComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() type: MatInputType = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() showMessageError: boolean = false;
  @Input() messageError: string = '';
  @Input() characterCounter: boolean = false;
  @Input() maxLength: number = Infinity;
  @Input() allowNegativeNumbers: boolean = false;
  @Input() max: number = Infinity;
  @Input() min: number = 0;
  @Input() shortStyle: boolean = false;
  @Input() appearance: MatFormFieldAppearance = 'fill';


  private onChange: any = (value: any) => {};
  private onTouched: any = () => {};
  control: FormControl = new FormControl();
  previousValue = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showMessageError && changes['showMessageError']) {
      this.control.markAsTouched();
    }
  }

  ngOnInit(): void {
    const validators = this.ngControl?.control?.validator;
    this.control.setValidators(validators ? validators : null);
    this.control.updateValueAndValidity();
  }

  writeValue(value: any): void {
    this.previousValue = value;
    this.control.patchValue(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(): void {
    let value = this.control.value;
    
    if((this.type === 'number' || this.type === 'coin') && value) {
      
      if(this.type === 'coin') {
        value = value.replace(/-R\$ /g, '-').replace(/R\$ /g, '').replace('.', '').replace(',', '.');
        
        if (value?.replace(/.$/g, '') == this.max) {
          value = value?.replace(/.$/g, '');
          this.control.patchValue(value);
        }
      }

      let numericValue = parseFloat(value);

      if (numericValue > this.max) {
        const lastDigitIndex = value.length - 1;
        value = `${value.slice(0, lastDigitIndex)}.${value.slice(lastDigitIndex)}`;
        numericValue = parseFloat(value);

        if (numericValue > this.max) {
          this.control.patchValue(this.previousValue);
          return;
        }

        this.control.patchValue(numericValue);
      }

      if (numericValue < this.min) {
        const lastDigitIndex = value.length - 1;
        value = `${value.slice(0, lastDigitIndex)}.${value.slice(lastDigitIndex)}`;
        numericValue = parseFloat(value);
  
        if (numericValue < this.min) {
          this.control.patchValue(this.previousValue);
          return;
        }

        this.control.patchValue(numericValue);
      }

      this.previousValue = value;
    }

    this.onChange(value);
  }

  onInputTouche() {
    this.onTouched()
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

}



  


