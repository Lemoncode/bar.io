import React from 'react';
import { useField } from 'formik';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

export const TextFieldComponent: React.FunctionComponent<TextFieldProps> = (props) => {
  const [field, meta] = useField(props.name);
  const hasError = Boolean(meta && meta.touched && meta.error);

  return (
    <MuiTextField
      {...props}
      inputProps={props.inputProps}
      name={props.name ?? field.name}
      onChange={props.onChange ?? field.onChange}
      onKeyUp={props.onKeyUp}
      onBlur={props.onBlur ?? field.onBlur}
      value={props.value ?? field.value}
      error={hasError}
      helperText={hasError ? meta.error : ''}
      fullWidth={true}
      margin='normal'
    />
  );
};
