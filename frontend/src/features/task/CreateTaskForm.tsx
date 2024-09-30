import { inputTaskSchema } from 'validator';
import Form from '@/components/Form';
import useForm from '@/hooks/useForm';
import type { TaskType } from '@/services/task.service';

type CreateTaskFormProps = {
    errors?: Record<string, string>;
    onSubmit: (task: Omit<TaskType, 'id'>) => void;
    onCancel?: () => void;
};

const initialValues = {
    title: '',
    status: 'new',
    description: '',
} as const;

export default function CreateTaskForm({ errors, onCancel, onSubmit }: CreateTaskFormProps) {
    const { values, register } = useForm<Omit<TaskType, 'id'>>({
        initialValues,
        errors,
    });

    const handleSubmit = () => {
        try {
            const result = inputTaskSchema.parse(values);
            onSubmit(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="task-form">
                <Form.Input label="標題" {...register('title')} />
                <Form.Select
                    label="狀態"
                    options={['new', 'active', 'completed']}
                    {...register('status')}
                />
                <Form.Input label="描述" as="textarea" rows={3} {...register('description')} />
                <div className="task-form__actions">
                    <button type="submit">新增</button>
                    <button type="button" onClick={onCancel}>
                        取消
                    </button>
                </div>
            </div>
        </Form>
    );
}
