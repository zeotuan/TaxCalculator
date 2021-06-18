import React from 'react';
import { Form} from "semantic-ui-react";
import { ErrorMessage, Field, FieldProps} from "formik";
import {Input,Label } from 'semantic-ui-react';
export interface Option{
  value: string;
  label: string;
}

// props for select field component
export interface SelectFieldProps{
  name: string;
  label: string;
  options: Option[];
  disable?:boolean;
}

export const SelectField = ({
  name,
  label,
  options,
  disable
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className={disable? "ui disabled dropdown":"ui dropdown"}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  type:'text'|'password';
  disable?:boolean;
  
}

export const TextField= ({
  field,
  label="",
  placeholder,
  type = 'text',
  disable
}: TextProps) => (
  <Form.Field>
    {label && <label>{label}</label>}
    <Input placeholder={placeholder} type={type} labelPosition='right' disabled={disable} {...field} >
    <Label basic>$</Label>
      <input />
    <Label basic>.00</Label>
    </Input>
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);