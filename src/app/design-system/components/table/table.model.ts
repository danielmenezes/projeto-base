export type TypeInputModel =
  | 'number'
  | 'text'
  | 'coin';

export interface ConfigFieldModel {
  type: TypeInputModel;
  allowNegativeNumbers: boolean;
} 

export interface ColumnsTableModel {
  key: string; 
  label: string; 
  editable: boolean;
}