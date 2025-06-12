import type React from "react"

import "@/style/components/invitePage/QRcodeGenerator/sharePhotoGenerator.css"
import { useTranslation } from "react-i18next"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

import DVPN from "@/assets/dvpn.png"
import { generateInvitationImg } from "@/utils/generateInviteImg"

export interface receiveQRProps{
    QrRef: React.RefObject<HTMLCanvasElement> | null
}

export interface SharePhotoGeneratorRef {
    getSharePhoto: () => void;
}

const SharePhotoGenerator = forwardRef<SharePhotoGeneratorRef, receiveQRProps>(({ QrRef }, ref) => {

    const {t} = useTranslation()

    const html2Ref = useRef<HTMLDivElement |null>(null)

    useImperativeHandle(ref, () => ({
        getSharePhoto: () => {
            generateInvitationImg(html2Ref.current);
        }
    }));

    const qrContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(QrRef!.current && qrContainerRef.current){
            qrContainerRef.current.innerHTML = ""

            const image = new Image();
            image.src = QrRef!.current.toDataURL("image/png"); 
            image.style.width = "240px";
            image.style.height = "240px";
            image.style.margin = "auto";
            image.style.marginTop = "5px";
            const label = document.createElement("div");

            label.innerText = t("scantodownload");
            label.style.marginTop = "12px";
            label.style.fontSize = "14px";
            label.style.fontWeight = "500";
            label.style.textAlign = "center";
            label.style.color = "#08BBFF";
            label.style.marginTop = "3px";

            qrContainerRef.current.appendChild(label);
            qrContainerRef.current.appendChild(image); 
        }
    },[QrRef])


    return(
        <div className="SharePhotoGeneratorBox" ref={html2Ref}>
            <div className="introduceBox p2p">
                <h1 className="p2pcommunication">{t("p2pcommunication")}</h1>
                <div className="Dot blue"/>
            </div>
            <div className="introduceBox break">
                <div className="Dot green"/>
                <h1 className="breakNetwork">{t("breakNetwork")}</h1>
            </div>
            <div className="introduceBox local">
                <h1 className="breakNetwork">{t("breakelocal")}</h1>
                <div className="Dot red"/>
            </div>
            <div className="introduceBox safe">
                <div className="Dot purple"/>
                <h1 className="breakNetwork">{t("saferAndStable")}</h1>
            </div>
            <div className="sharePhotoTitle">
                <div className="DVPNBox">
                    <img src={DVPN} className="sharePhotoDvpn"/>
                    <h1 className="sharePhotoDVPN">D-VPN</h1>
                </div>
                <h2>——{t("theworldsfrist..")}</h2>
            </div>
            <div ref={qrContainerRef} className="sharePhotoQRcodeContainer"/>
        </div>
    )
})

export default SharePhotoGenerator