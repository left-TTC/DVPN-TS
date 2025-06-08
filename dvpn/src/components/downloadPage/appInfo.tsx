
import "../../style/components/downloadPage/appInfo.css"

import robot from "../../assets/robot.png"
import BlinkingEyes from "../animeComponents/appinfo/blinkEyes";
import { useEffect, useRef, useState } from "react";
import StartVedio from "../animeComponents/appinfo/startVedio";
import VedioPlayer, { type VideoPlayerHandle } from "./appinfo/videoPlayer";
import IntroduceAppInfo from "../animeComponents/appinfo/dvpnInfo";
import AppInfoEnd from "./appinfo/appinfoEnd";

import fullScreen from "../../assets/full-screen.svg"

import { useTranslation } from "react-i18next"
import { animate } from "animejs";

const AppInfo = () => {
    const { t } = useTranslation();

    const videoRef = useRef<VideoPlayerHandle>(null);
    const fullScreenRef = useRef<HTMLButtonElement | null> (null);
    const [volume, setVolume] = useState(0.5);

    const [watchVideo, setWatchVideo] = useState(false)

    const playVideo = () => {
        videoRef.current!.play();
    }

    const pauseVideo = () => {
        videoRef.current!.pause()
    }

    const getVedioPlayingState = () => {
        return videoRef.current!.getIsPlaying()
    }

    const beFullScreen = () => {
        videoRef.current!.enterFullscreen()
        console.log("enterFullscreen 调用了");
    }

    useEffect(() => {
        console.log("change:", watchVideo)
    },[watchVideo])

    useEffect(() => {
        const full = fullScreenRef.current
        if(full && watchVideo){
            setTimeout(() => {
                animate(full, {
                    opacity: [0, 0.8],
                    duration: 600
                })
            }, 700)
        }
    }, [watchVideo])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.setVolume(volume);
        }
    }, [videoRef]);

    console.log(watchVideo)
    return (
        <div className="appinfo">
            <div className="glow1"/>
            <h1 className="understandindDVPN">{t("understadingDvpn")}</h1>
            <div className="vedioPlayer">
                <img src={robot} className="robot"/>
                {!watchVideo &&
                    <BlinkingEyes ifLoadVedio={watchVideo}/>
                }
                {watchVideo &&
                    <VedioPlayer ref={videoRef}/>
                }
                {watchVideo &&
                    <button className="fullscreenButton" onClick={beFullScreen} ref={fullScreenRef}>
                        <img src={fullScreen} className="fullscreenimg"/>
                    </button>
                }
                {watchVideo &&
                    <div className="volume-control">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => {
                            const vol = parseFloat(e.target.value);
                            setVolume(vol);
                            videoRef.current?.setVolume(vol);
                            }}
                        />
                    </div>
                }
                <StartVedio ifLoadideo={watchVideo} setLoad={setWatchVideo} pause={pauseVideo} playVideo={playVideo} getPlayingState={getVedioPlayingState}/>
            </div>
            <div className="linecontainer">
                <div className="robotline"/>
            </div>
            <IntroduceAppInfo />
            <div className="glow4"/>
            <AppInfoEnd />
        </div>
    )
}

export default AppInfo;
