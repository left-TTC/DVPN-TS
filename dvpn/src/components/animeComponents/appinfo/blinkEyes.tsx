import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import "../../../style/components/anime/blinkEyes.css";

interface Props {
    ifLoadVedio: boolean;
}

const BlinkingEyes: React.FC<Props> = ({ ifLoadVedio }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const leftEyeRef = useRef<HTMLDivElement | null>(null);
    const rightEyeRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<number | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const hasAnimated = useRef(false);

    if(!ifLoadVedio){
            useEffect(() => {
            const startWinking = () => {
                animate('.eye', {
                    scale: [0, 1],
                    duration: 200,
                    easing: 'spring(1, 80, 10, 0)',
                });

                if(!intervalRef.current){
                    intervalRef.current = window.setInterval(() => {
                        animate('.eye', {
                            duration: 300,
                            height: 5,
                            easing: 'easeInOutQuad',
                        });

                        setTimeout(() => {
                            animate('.eye', {
                                duration: 300,
                                height: 40,
                                easing: 'easeInOutQuad',
                            });
                        }, 300);
                    }, 3000);
                }
            };

            const stopWinking = () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };

            if (containerRef.current) {
                observerRef.current = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting && !hasAnimated.current) {
                            hasAnimated.current = true;
                            setTimeout(() => {
                                startWinking();
                            }, 800);

                            observerRef.current?.disconnect();
                        }
                    },
                    { threshold: 0.5 }
                );

                observerRef.current.observe(containerRef.current);
            }
            
            return () => {
                stopWinking();
                observerRef.current?.disconnect();
            };
        }, []);  
    }else{
        leftEyeRef.current = null;
        rightEyeRef.current = null;
        console.log("remove")
    }

    return (
        <div className="eye-container" ref={containerRef}>
            <div className="eye left" ref={leftEyeRef}></div>
            <div className="eye right" ref={rightEyeRef}></div>
        </div>
    );
};

export default BlinkingEyes;
