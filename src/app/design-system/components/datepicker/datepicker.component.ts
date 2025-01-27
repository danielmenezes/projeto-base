import { Component, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type DatePickerType =
  | 'date'
  | 'range-date'

@Component({
  selector: 'app-datepicker',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DatepickerComponent implements OnInit, OnChanges, ControlValueAccessor{

  @Input() type: DatePickerType = 'date';
  @Input() label: string = '';
  @Input() showMessageError: boolean = false;
  @Input() messageError: string = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() shortStyle: boolean = false;

  private onChange: any = (value: any) => {};
  private onTouched: any = () => {};

  startDate: FormControl = new FormControl();
  endDate: FormControl = new FormControl();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showMessageError && changes['showMessageError']) {
      this.startDate.markAsTouched();
      this.endDate.markAsTouched();
    }
  }
  
  ngOnInit(): void {
    const validators = this.ngControl?.control?.validator;
    this.startDate.setValidators(validators ? validators : null);
    this.endDate.setValidators(validators ? validators : null);
    this.startDate.updateValueAndValidity();
    this.endDate.updateValueAndValidity();
  }

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.startDate.patchValue(value[0] || '');
      this.endDate.patchValue(value[1] || '');
    } else {
      this.startDate.patchValue(value || '');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputTouche() {
    this.onTouched()
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.startDate.disable();
      this.endDate.disable();
    } else {
      this.startDate.enable();
      this.endDate.enable();
    }
  }

  onSelectDate(): void {
    if(this.type === 'date') {
      this.onChange(this.startDate.value);
    } else {
      if(this.startDate.value && this.endDate.value) {
        this.onChange([this.startDate.value, this.endDate.value]);
      }
    }
  }

  clearDate() {
    this.startDate.patchValue(null);
    this.endDate.patchValue(null);
    this.onChange(null);
  }
}
