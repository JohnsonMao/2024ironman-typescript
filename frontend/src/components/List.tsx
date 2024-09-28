import { Fragment } from 'react';

type ListProps<TItem> = {
    as?: React.ElementType;
    className?: string;
    items: TItem[];
    renderKey: (item: TItem) => string | number;
    renderItem: (item: TItem) => React.ReactNode;
};

export default function List<TItem>({
    as,
    className,
    items,
    renderKey,
    renderItem,
}: ListProps<TItem>) {
    const Wrapper = as || 'div';

    return (
        <Wrapper className={className}>
            {items.map((item) => (
                <Fragment key={renderKey(item)}>{renderItem(item)}</Fragment>
            ))}
        </Wrapper>
    );
}
