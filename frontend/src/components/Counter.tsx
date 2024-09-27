type CounterProps = {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

export default function Counter({ count, onIncrement, onDecrement }: CounterProps) {
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
        </div>
    );
}
