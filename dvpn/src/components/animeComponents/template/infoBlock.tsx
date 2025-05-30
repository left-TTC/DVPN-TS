import React, { useEffect, useRef } from "react";


import "../../../style/components/anime/infoBlock.css"
import { animate } from "animejs";

export enum Direction{
    Left,
    Right,   
}

export interface infoBlockProps{
    direction: Direction,
    title: string,
    text: string[],
}

const InfoBlock: React.FC<infoBlockProps> = ({direction, text, title}) => {

    const infoBlockRef = useRef<HTMLDivElement | null>(null)
    const infoBlockTextRef = useRef<HTMLDivElement | null>(null)
    const titleBlockRef = useRef<HTMLDivElement | null>(null)
    const titleObserverRef = useRef<IntersectionObserver | null>(null)
    const hasTitleOKRef = useRef(false)
    const textRef = useRef<HTMLUListElement | null>(null)

    const ifLeft = direction === Direction.Left

    const showTextBlock = () => {
        if(infoBlockTextRef.current){
            animate(infoBlockTextRef.current, {
                duration: 500,
                opacity: [0, 0.6],
                translateY: ['-40%', '0%'],
                easing: 'ease-out',
                delay: 600
            })
        }
    }

    const showTextContent = () => {
        const text = textRef.current;
        if(text){
            animate(text, {
                opacity:[0, 1],
                duration: 500,
                easing: 'ease-out',
                delay: 800
            })
        }
    }

    useEffect(() => {
        console.log("coming")
        if(titleBlockRef.current){
            console.log("listen")
            titleObserverRef.current = new IntersectionObserver(
                ([entry]) => {
                    console.log("listened")
                    if(entry.isIntersecting && !hasTitleOKRef.current) {
                        console.log("entry")
                        hasTitleOKRef.current = true;
                        setTimeout(() => {
                            console.log("anime")
                            const title =  titleBlockRef.current
                            if(title){
                                //title animation
                                animate(title, {
                                    duration: 600,
                                    opacity: [0, 0.5],
                                    translateX: ['-70%', '0%'],
                                    easing: 'ease-out',
                                    complete: () => {
                                        showTextBlock();
                                        showTextContent();
                                    }
                                })

                            }
                        }, 800)

                        titleObserverRef.current?.disconnect()
                    }
                },
                { threshold: 0.5 }
            );

            titleObserverRef.current.observe(titleBlockRef.current)
        }
    }, [])

    return(
        <div className="smallinfoblock" ref={infoBlockRef}>
            <div ref={titleBlockRef} className={`infoBlockContentBlock ${ifLeft ? 'leftdir' : 'rightdir'}`} >
                <h1>{title} </h1>
            </div>
            <div ref={infoBlockTextRef} className={`infoblocktextblock ${!ifLeft ? 'leftdir' : 'rightdir'}`}>
                <ul className={`infoblocktextbox ${ifLeft ? 'lefttext' : 'righttext'}`} ref={textRef}>
                    {text.map((line, index) => (
                        <li className="textboxContents" key={index}>{line}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default InfoBlock
