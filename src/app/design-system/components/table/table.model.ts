export type TypeInputModel =
  | 'number'
  | 'text'
  | 'coin';

export interface ConfigFieldModel {
  type?: TypeInputModel;
  allowNegativeNumbers?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
} 

export interface ColumnsTableModel {
  key: string; 
  label: string; 
  editable?: boolean;
  editableFieldConfig?: ConfigFieldModel;
}