import { useEffect, useRef, useState } from "react"

import "../../../style/components/downloadPage/appinfo/apinfoEnd.css"

import moreInfo from "../../../assets/moreInfo.svg"
import { animate } from "animejs"

import { useTranslation } from "react-i18next";
import { copyShare } from "../../../utils/copyShare";
import { downloadDVPN } from "../../../utils/downloadApk";
import { readVersionCode } from "../../../utils/getVersion";

const AppInfoEnd = () => {
    const { t } = useTranslation();

    const appInfoEndRef = useRef<HTMLDivElement | null>(null)
    const [hasAnimated, setHasAnimated] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const download = () => {
        copyShare();
        downloadDVPN();
    }

    useEffect(() => {
        if (appInfoEndRef.current){
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    if(entry.isIntersecting && !hasAnimated && appInfoEndRef.current){
                        setHasAnimated(true)
                        animate(appInfoEndRef.current, {
                            duration: 1000,
                            opacity: [0, 1],
                            delay: 1200,
                        })

                        observerRef.current?.disconnect();
                    }
                },
                { threshold: 0.5 }
            );

            observerRef.current.observe(appInfoEndRef.current);
        }
        return () => {
            observerRef.current?.disconnect();
        };
    },[])

    const lastestVersion = readVersionCode()
    const version = lastestVersion? (lastestVersion) : ("Load Fail")

    return(
        <div ref={appInfoEndRef} className="appinfoend">
            <div className="moreInfoBox">
                <img src={moreInfo} className="moreInfoImg" />
            </div>
            <h1>{t("wwillcontinue..")}</h1>
            <h2>{t("joinustoenter..")}</h2>
            <button className="appinfoendbutton" onClick={() => download()}>
                {t("download")}
            </button>
            <h3>{t("newestVersion")}: {version}</h3>
        </div>
    )
}

export default AppInfoEnd