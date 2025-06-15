import React, { createContext, useCallback, useContext, useState } from "react";
import FixedToast, { FixedToastType, type Message } from "@/utils/fixedToast"
import { createPortal } from "react-dom";

interface FixedToastMessage {
    id: number;
    message: Message;
    type: FixedToastType;
    onConfirm?: () => void;
}

type ShowFixedToastFunction = (message: Message, type: FixedToastType, onConfirm?: () => void) => void;

const FixedToastContext = createContext<ShowFixedToastFunction | null>(null);

export const FixedToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<FixedToastMessage[]>([]);
    const [nextId, setNextId] = useState(0);

    const showFixedToast: ShowFixedToastFunction = useCallback(
        (message, type, onConfirm) => {
            const id = nextId;
            setNextId(prev => prev + 1);
            setToasts(prev => [...prev, { id, message, type, onConfirm }]); // ✅ 添加 onConfirm
        },
        [nextId]
    );

    const handleRemove = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <FixedToastContext.Provider value={showFixedToast}>
            {children}
            {createPortal(
                <>
                    {toasts.map((toast, index) => (
                        <FixedToast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onConfirm={toast.onConfirm}
                            offsetIndex={index}
                            onFinish={() => handleRemove(toast.id)}
                        />
                    ))}
                </>,
                document.body
            )}
        </FixedToastContext.Provider>
    );
};

export const useFixedToast = (): ShowFixedToastFunction => {
    const context = useContext(FixedToastContext);
    if (!context) {
        throw new Error("useFixedToast must be used within FixedToastProvider");
    }
    return context;
};