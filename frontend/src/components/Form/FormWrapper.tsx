type FormWrapperProps = {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormWrapper({ children, onSubmit }: FormWrapperProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
    };

    return <form onSubmit={handleSubmit}>{children}</form>;
}
