import Toast from "@/utils/toast";
import { useCallback, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { createContext } from "react";


export enum ToastTypes{
    Default,
    Success,
    Error,
}

export interface ToastMessage {
    id: number; 
    message: string;
    type?: ToastTypes
    duration?: number;
}

type ShowToastFunction = (
    message: string,
    type?: ToastTypes,
    duration?: number
) => void;

const ToastContext = createContext<ShowToastFunction | null>(null);

interface ToastProviderProps {
    children: ReactNode; 
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) =>{
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const [nextId, setNextId] = useState<number>(0);

    const showToast: ShowToastFunction = useCallback((message, type = ToastTypes.Default, duration = 2500) => {
        const id = nextId; 
        setNextId(prevId => prevId + 1); 
        const newToast: ToastMessage = { id, message, type, duration };
        setToasts(prevToasts => [...prevToasts, newToast]);
    }, [nextId]);

    const removeToast = useCallback((idToRemove: number) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== idToRemove));
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {createPortal(
                <div className="toast-container">
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id} 
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => removeToast(toast.id)} 
                        />
                    ))}
                </div>,
                document.body 
            )}
        </ToastContext.Provider>
    );
}


export const useToast = (): ShowToastFunction => {
    const context = useContext(ToastContext);
    return context!;
};

