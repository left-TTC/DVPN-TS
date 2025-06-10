import { useRef, useImperativeHandle, forwardRef } from "react";
import "../../../style/components/downloadPage/appinfo/videoPlayer.css";
import i18n from "../../../i18n";

// const OKCACHE: number = 40;
// const COULDPLAYATIME: number = 3;

export type VideoPlayerHandle = {
    play: () => Promise<void>;
    pause: () => void;
    getIsPlaying: () => boolean;
    enterFullscreen: () => void;
    setVolume: (volume: number) => void;
    getVolume: () => number | undefined;
};

const VideoPlayer = forwardRef<VideoPlayerHandle, {}>((_, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const currentLanguage = i18n.language;
    let videoSrc = "/video/DVPN.mp4";

    switch (currentLanguage) {
        case "zh":
        case "zh-CN":
            videoSrc = "/video/zhdvpn.mp4";
            break;
        case "en":
        case "en-GB":
        case "en-US":
            videoSrc = "/video/DVPN.mp4";
            break;
        default:
            videoSrc = "/video/DVPN.mp4";
    }

    useImperativeHandle(ref, () => ({
        play: () => {
            if (videoRef.current) {
                return videoRef.current.play();
            } else {
                return Promise.resolve();
            }
        },
        pause: () => {
            videoRef.current?.pause();
        },
        getCurrentTime: () => {
            return videoRef.current?.currentTime;
        },
        getElement: () => {
            return videoRef.current;
        },
        getIsPlaying: () => {
            return !!videoRef.current! && !videoRef.current!.paused && !videoRef.current!.ended && videoRef.current!.readyState > 2;
        },
        enterFullscreen: () => {
            const video = videoRef.current;
            if (video) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if ((video as any).webkitRequestFullscreen) {
                    (video as any).webkitRequestFullscreen(); 
                } else if ((video as any).mozRequestFullScreen) {
                    (video as any).mozRequestFullScreen(); 
                } else if ((video as any).msRequestFullscreen) {
                    (video as any).msRequestFullscreen(); 
                }
            }
        },
        setVolume: (volume: number) => {
            if (videoRef.current) {
                videoRef.current.volume = Math.min(1, Math.max(0, volume));
            }
        },
        getVolume: () => {
            return videoRef.current?.volume;
        }
    }));

    return (
        <div className="vediocontainer">
            <video
                ref={videoRef}
                src={videoSrc}
                preload="auto"
                className="video"
            />
        </div>
    );
});


export default VideoPlayer;
