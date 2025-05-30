

import "../../../style/components/anime/dvpnInfo.css"
import InfoBlock, { Direction } from "../template/infoBlock"

import { useTranslation } from "react-i18next";

export interface aIntroduce{
    title: string,
    text: string[],
}

const IntroduceAppInfo = () => {

    const {t} = useTranslation()

    const content1: aIntroduce = {
        title: t("completelyFree"),
        text: [
            t("allnodesarefree"),
            t("nointermediayrfees")
        ]
    }

    const content2: aIntroduce = {
        title: t("completelysafety"),
        text: [
            t("p2pproxytraffic"),
            t("decentralizednetworkstructure")
        ]
    }

    const content3: aIntroduce = {
        title: t("compeletelystable"),
        text: [
            t("allnodesaarehomeip"),
            t("jimpossibletoban"),
            t("nodeoptions..")
        ]
    }

    const content4: aIntroduce = {
        title: t("promisingfunture"),
        text: [
            t("solanabasedcommunity"),
            t("chatecologyformedbynodes"),
        ]
    }
    

    return(
        <div className="dvpnInfoBlock">
            <h1 className="features">{t("DVPNFeatures")}</h1>
            <InfoBlock direction={Direction.Left} title={content1.title} text={content1.text}/>
            <div className="glow2"/>
            <InfoBlock direction={Direction.Right} title={content2.title} text={content2.text}  />
            <InfoBlock direction={Direction.Left} title={content3.title} text={content3.text} />
            <div className="glow3"/>
            <InfoBlock direction={Direction.Right} title={content4.title} text={content4.text} />
        </div>
    )
}

export default IntroduceAppInfo