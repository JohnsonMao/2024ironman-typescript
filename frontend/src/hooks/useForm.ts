import { useState } from 'react';
import { FormControlElement } from '@/components/Form/Input';

type UseFormProps<TValues extends Record<string, unknown>> = {
    initialValues: TValues;
    errors?: Record<string, string>;
};

export default function useForm<TValues extends Record<string, unknown>>({
    initialValues,
    errors,
}: UseFormProps<TValues>) {
    const [values, setValues] = useState<TValues>(initialValues);

    const onChange = (e: React.ChangeEvent<FormControlElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const register = (name: keyof TValues) => ({
        name,
        value: values[name],
        error: errors?.[name.toString()],
        onChange,
    });

    return {
        values,
        register,
    };
}
