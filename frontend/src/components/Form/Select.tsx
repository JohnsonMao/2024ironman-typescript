import { useId } from 'react';

type SelectProps<
    TOption,
    TValue extends string | number
> = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: TOption[];
    error?: string;
    renderOption?: (option: TOption) => React.ReactNode;
    renderValue?: (option: TOption) => TValue;
};

export default function Select<TOption, TValue extends string | number>({
    label,
    options,
    renderOption = (option) => option as React.ReactNode,
    renderValue = (option) => option as unknown as TValue,
    error,
    ...props
}: SelectProps<TOption, TValue>) {
    const id = useId();
    const selectId = props.id || `select-${id}`;

    return (
        <div>
            <div className="form-item">
                <label htmlFor={selectId}>{label}</label>
                <select {...props} id={selectId}>
                    {Array.isArray(options) &&
                        options.map((option) => (
                            <option key={renderValue(option)} value={renderValue(option)}>
                                {renderOption(option)}
                            </option>
                        ))}
                </select>
            </div>
            {error && <p className="form-item__error">{error}</p>}
        </div>
    );
}
