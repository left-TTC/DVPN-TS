
import "../../style/components/downloadPage/appInfo.css"

import robot from "../../assets/robot.png"
import BlinkingEyes from "../animeComponents/appinfo/blinkEyes";
import { useEffect, useState } from "react";
import StartVedio from "../animeComponents/appinfo/startVedio";
import VedioPlayer from "./appinfo/videoPlayer";
import IntroduceAppInfo from "../animeComponents/appinfo/dvpnInfo";
import AppInfoEnd from "./appinfo/appinfoEnd";

import { useTranslation } from "react-i18next"

const AppInfo = () => {
    const { t } = useTranslation();

    const [watchVideo, setWatchVideo] = useState(false)

    useEffect(() => {
        console.log("change:", watchVideo)
    },[watchVideo])

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
                    <VedioPlayer />
                }
                <StartVedio ifLoadideo={watchVideo} setLoad={setWatchVideo} />
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
