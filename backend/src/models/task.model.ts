async function getTasks() {
    return [
        {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            completed: false,
        },
    ];
}

export type Task = Awaited<ReturnType<typeof getTasks>>[number];

export default getTasks;
