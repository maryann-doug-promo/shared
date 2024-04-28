interface FieldType {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  pattern?: string;
  minLength: number;
  maxLength: number;
  required: boolean;
}

export interface InputType extends FieldType {
  type: string;
  pattern?: string;
  error_message?: string;
}

export interface TextAreaType extends FieldType {
  rows: number;
}