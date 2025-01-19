import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { TypeInputModel } from '../table.model';

@Component({
  selector: 'app-inputs',
  imports: [CommonModule, NgxMaskDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  providers: [provideNgxMask()]
})
export class InputsComponent implements OnInit, ControlValueAccessor {

  @Input() type: TypeInputModel = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() maxLength: number = Infinity;
  @Input() allowNegativeNumbers: boolean = false;
  @Input() max: number = Infinity;
  @Input() min: number = 0;


  private onChange: any = (value: any) => {};
  private onTouched: any = () => {};
  control: FormControl = new FormControl();
  previousValue = null;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
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
