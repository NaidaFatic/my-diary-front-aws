import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    //console.log(props)
    return (
        <div className="mb-2">
            <h4 htmlFor={field.name}>{label}</h4>
            {
                (field.name === "description") ?
                    <textarea placeholder={field.placeholder}
                        className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                        {...field} {...props}
                        autoComplete="off"
                    > {field.value}</textarea> :
                    <input placeholder={field.placeholder}
                        className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                        {...field} {...props}
                        autoComplete="off"
                        value={field.value || ''}
                    />
            }
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}