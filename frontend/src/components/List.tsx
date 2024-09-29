import { Fragment } from 'react';

type ListProps<TItem> = {
    as?: React.ElementType;
    className?: string;
    items: TItem[];
    renderKey: (item: TItem) => string | number;
    renderItem: (item: TItem) => React.ReactNode;
};

export default function List<TItem>({
    as: Wrapper = 'div',
    className,
    items,
    renderKey,
    renderItem,
}: ListProps<TItem>) {
    return (
        <Wrapper className={className}>
            {items.map((item) => (
                <Fragment key={renderKey(item)}>{renderItem(item)}</Fragment>
            ))}
        </Wrapper>
    );
}
