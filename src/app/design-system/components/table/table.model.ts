export type TypeInputModel =
  | 'number'
  | 'text'
  | 'coin'
  | 'calendar'
  | 'checkbox';

export type TypeDateModel =
  | 'date'
  | 'range-date'

export interface ConfigFieldModel {
  type?: TypeInputModel;
  allowNegativeNumbers?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  typeDate?: TypeDateModel;
} 

export interface ColumnsTableModel {
  key: string; 
  label: string; 
  editable?: boolean;
  editableFieldConfig?: ConfigFieldModel;
}