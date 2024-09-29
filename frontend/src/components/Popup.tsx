type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Popup({ isOpen, onClose, children }: PopupProps) {
    if (!isOpen) return null;

    return (
        <div className="popup" onClick={() => onClose()}>
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <button className="popup__content__close-button" onClick={() => onClose()}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
}
