import type React from "react";
import { useEffect, useRef, useState } from "react";

import "@/style/utils/toast.css"
import { ToastTypes } from "@/context/toastProvider";
import { animate } from "animejs";


export interface ToastProps{
    message: string,
    type?: ToastTypes,
    duration?: number;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({message, type, duration, onClose}) =>{
    const [isVisible, setIsVisible] = useState(false);

    const toastRef = useRef<HTMLDivElement | null> (null)

    useEffect(() =>{
        setIsVisible(true)
        const timer = setTimeout(() => {
            
            const fadeOutTimer = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, 2000); 

            return () => clearTimeout(fadeOutTimer);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, message, onClose])

    useEffect(() => {
        const toast = toastRef.current
        if(toast && isVisible){
            animate(toast, {
                opacity: [0,1],
                duration:1000,
                translateY: -50
            })
            setTimeout(() => {
                animate(toast, {
                    opacity: [1,0],
                    duration: 1000,
                    translateY: 50
                })   
            },1500)
            
        }
    },[isVisible])

    const toastClasses = 
    type === ToastTypes.Default || type === ToastTypes.Success ? "toast" : "toast1";

    return (
        <div className={toastClasses} ref={toastRef}>
            {message}
        </div>
    );
}

export default Toast;