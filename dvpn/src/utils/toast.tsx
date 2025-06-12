import type React from "react";
import { useEffect, useState } from "react";

import "@/style/utils/toast.css"
import type { ToastTypes } from "@/context/toastProvider";


export interface ToastProps{
    message: string,
    type?: ToastTypes,
    duration?: number;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({message, type, duration, onClose}) =>{
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() =>{
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false); 
            const fadeOutTimer = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, 400); 

            return () => clearTimeout(fadeOutTimer);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, message, onClose])

    const toastClasses = `toast ${isVisible ? 'show' : ''}`;

    return (
        <div className={toastClasses }>
            {message}
        </div>
    );
}

export default Toast;