import { useEffect, useRef } from "react"
import "../../../style/components/anime/startVedio.css"
import { animate } from "animejs"


import play from "../../../assets/play.svg"

interface VedioProps {
    ifLoadideo: boolean,
    setLoad: (ifLoad: boolean) => void,
    playVideo: () => void,
    pause: () => void,
    getPlayingState: () => boolean,
}

const StartVedio: React.FC<VedioProps> = ({ ifLoadideo, setLoad, playVideo, pause, getPlayingState }) => {
    const startRef = useRef<HTMLButtonElement | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!startRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate('.load', {
                        duration: 500,
                        scale: [0, 1],
                        opacity: [0, 0.7],
                        easing: 'spring(1, 80, 10, 0)',
                    });

                    if(!intervalRef.current){
                            intervalRef.current = window.setInterval(() => {
                            animate('.load', {
                                duration: 200,
                                scale: [1, 0.85],
                                opacity: [0.7, 0.6],
                            });
                            setTimeout(() => {
                                animate('.load', {
                                    duration: 200,
                                    scale: [0.85, 1],
                                    opacity: [0.6, 0.7],
                                });
                            }, 220);
                        }, 2500);
                    } 
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(startRef.current);

        return () => {
            
            observer.disconnect();
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const hadleButton = () => {
        if(!ifLoadideo){
            setLoad(true)
        }else{
            if(!getPlayingState()){
                playVideo()
            }else{
                pause()
            }
        }
    }

    return (
        <button onClick={hadleButton} className="load loadbutton" ref={startRef}>
            <img src={play} className="playvedio"/>
        </button>
    );
};

export default StartVedio;
