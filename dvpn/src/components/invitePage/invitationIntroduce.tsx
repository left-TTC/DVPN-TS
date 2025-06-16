
import { useEffect, useRef } from "react";
import { useInviteContext } from "../../pages/invite";
import "@/style/components/invitePage/InvitationIntroduce.css"
import { animate } from "animejs";
import { useTranslation } from "react-i18next";

import "@/style/components/invitePage/InvitationIntroduce.css"
import Whyinviteorthers, { imgPaths, type whyinviteorthersContext } from "./invitationIntroduce/whyInviteTemplate";
import HowToInviteEffectively from "@/components/invitePage/invitationIntroduce/howToInvite";

export interface IntroduceProps{
    setDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvitationIntroduce: React.FC<IntroduceProps> = ({setDown}) => {
    const {ifShowQRCode} = useInviteContext()
    const downRef = useRef<HTMLDivElement | null>(null)
    const {t} = useTranslation()

    useEffect(() => {
        if(ifShowQRCode){
            const page = downRef.current;
            if(page){
                animate(page, {
                    duration: 1200,
                    translateY: 890,
                    easing: 'easeInOutQuad',
                })
                setDown(true)
            }
        }
    }, [ifShowQRCode])

    const contentNode: whyinviteorthersContext = {
        text: t("getNodeContext"),
        title: t("getNode"),
        summarize: t("getNodesum")
    }
    const contentFwc: whyinviteorthersContext = {
        text: t("DVPNCryptocurrency"),
        title: t("GetCryptocurrency"),
        summarize: t("cryptocurrencysum")
    }

    return(
        <div className="InvitationIntroduce" ref={downRef}>
            <h1>{t("whyinviteorthers")}</h1>
            <Whyinviteorthers imgPath={imgPaths.P2P} content={contentNode} />
            <Whyinviteorthers imgPath={imgPaths.FWC} content={contentFwc} />
            <HowToInviteEffectively />
        </div>
    )
}

export default InvitationIntroduce