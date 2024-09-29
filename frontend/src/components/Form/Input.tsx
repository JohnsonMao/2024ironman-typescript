import React, { useId } from 'react';

export type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

type InputProps = React.InputHTMLAttributes<FormControlElement> & {
    label: string;
    as?: React.ElementType;
    rows?: number;
    error?: string;
};

function Input({ label, as: InputComponent = 'input', error, ...props }: InputProps) {
    const id = useId();
    const inputId = props.id || `input-${id}`;

    return (
        <div>
            <div className="form-item">
                <label htmlFor={inputId}>{label}</label>
                <InputComponent {...props} id={inputId} />
            </div>
            {error && <p className="form-item__error">{error}</p>}
        </div>
    );
}

export default Input;
