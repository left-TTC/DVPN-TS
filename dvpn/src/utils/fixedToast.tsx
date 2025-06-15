import { animate } from "animejs";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import "@/style/utils/fixedToast.css"

import close from "@/assets/close.svg"
import right from "@/assets/right.svg"
import error from "@/assets/error-fill.svg"
import { useTranslation } from "react-i18next";

export enum FixedToastType {
    Error,
    OK,
}

export interface Message {
    title: string,
    content: string,
    confirm: string,
    cancle?: string
}

export interface FixedToastProps {
    message: Message,
    type: FixedToastType,
    onFinish?: () => void;
    offsetIndex: number; // ✅ 接收 offsetIndex
    onConfirm?: () => void;
}

const FixedToast: React.FC<FixedToastProps> = ({ message, type, onFinish, offsetIndex, onConfirm }) => {
    const [ifShow, setIfShow] = useState(false)
    const [ifExit, setIfExit] = useState(false)

    const {t} = useTranslation()

    const fixedToast = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setIfShow(true)
    }, [message])

    useEffect(() => {
        const thisFixedToast = fixedToast.current
        if (thisFixedToast && ifShow) {
            animate(thisFixedToast, {
                translateX: [-400, 0 - offsetIndex * 28],
                translateY: [0, 0 -offsetIndex * 16],
                duration: 500
            })
        }
        if (thisFixedToast && ifExit) {
            animate(thisFixedToast, {
                translateX: [0 - offsetIndex * 36, 400],
                duration: 500,
                complete: () => {
                    setIfShow(false);
                    setTimeout(() => {
                        onFinish?.();
                    }, 500)
                },
            })
            setIfExit(false)
        }
    }, [ifExit, ifShow, offsetIndex]) 

    const fixedToastOk = () => {
        setIfExit(true)
        console.log("ready for confirm:", onConfirm)
        if(onConfirm){
            onConfirm()
        }
    }

    let content;
    switch (type) {
        case FixedToastType.OK:
            console.log("fixtoast")
            content = (
                <div className="fixedtoastmessageblock" ref={fixedToast}>
                    <div className="fixedtoastmessageblockglow green" />
                    <img src={close} className="fixedtoastmessageblockcloseimg" onClick={() => setIfExit(true)} />
                    
                    <div className="fixedtoastmessageblockintroduce">
                        <div className="rightblackbox">
                            <img src={right} className="rightblack"/>
                        </div>
                        <div className="fixedtoastmessageblockwords">
                            <h1>{message.title}</h1>
                            <h2>{message.content}</h2>
                        </div>
                    </div>
                    <div className="okButtobBlock">
                        <button className="fixedtoastmessageblockOK1" onClick={fixedToastOk}>
                            <h1>{message.confirm}</h1>
                        </button>
                        <button className="fixedtoastmessageblockOK1" onClick={() => setIfExit(true)}>
                            <h1>{message.cancle? message.cancle : t("exit")}</h1>
                        </button>
                    </div>
                </div>
            )
            break
        case FixedToastType.Error:
            content = (
                <div className="fixedtoastmessageblock" ref={fixedToast}>
                    <div className="fixedtoastmessageblockglow red" />
                    <img src={close} className="fixedtoastmessageblockcloseimg" onClick={() => setIfExit(true)} />
                    
                    <div className="fixedtoastmessageblockintroduce">
                        <div className="errorblackbox">
                            <img src={error} className="errorblack"/>
                        </div>
                        <div className="fixedtoastmessageblockwords">
                            <h1>{message.title}</h1>
                            <h2>{message.content}</h2>
                        </div>
                    </div>
                    <button className="fixedtoastmessageblockOK" onClick={fixedToastOk}>
                        <h1>{message.confirm}</h1>
                    </button>
                </div>
            )
            break
    }

    return (
        <div className="fixedtoast">
            {content}
            <div className="grayBackground" />
        </div>
    )
}

export default FixedToast
