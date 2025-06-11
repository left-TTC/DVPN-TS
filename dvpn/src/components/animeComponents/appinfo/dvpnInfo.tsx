

import "@/style/components/anime/dvpnInfo.css"
import InfoBlock, { Direction, Photo } from "../template/infoBlock"

import { useTranslation } from "react-i18next";

export interface aIntroduce{
    title: string,
    text: string[],
    photo: Photo,
}

const IntroduceAppInfo = () => {

    const {t} = useTranslation()

    const content1: aIntroduce = {
        title: t("completelyFree"),
        text: [
            t("allnodesarefree"),
            t("nointermediayrfees")
        ],
        photo: Photo.FreeNode
    }

    const content2: aIntroduce = {
        title: t("completelysafety"),
        text: [
            t("p2pproxytraffic"),
            t("decentralizednetworkstructure")
        ],
        photo: Photo.Safety
    }

    const content3: aIntroduce = {
        title: t("compeletelystable"),
        text: [
            t("allnodesaarehomeip"),
            t("jimpossibletoban"),
            t("nodeoptions..")
        ],
        photo: Photo.Stable
    }

    const content4: aIntroduce = {
        title: t("promisingfunture"),
        text: [
            t("solanabasedcommunity"),
            t("chatecologyformedbynodes"),
        ],
        photo: Photo.Solana
    }
    

    return(
        <div className="dvpnInfoBlock">
            <h1 className="features">{t("DVPNFeatures")}</h1>
            <InfoBlock direction={Direction.Left} title={content1.title} text={content1.text} photo={content1.photo}/>
            <div className="glow2"/>
            <InfoBlock direction={Direction.Right} title={content2.title} text={content2.text} photo={content2.photo} />
            <InfoBlock direction={Direction.Left} title={content3.title} text={content3.text} photo={content3.photo}/>
            <div className="glow3"/>
            <div className="glow4"/>
            <div className="glow5"/>
            <div className="glow6"/>
            <InfoBlock direction={Direction.Right} title={content4.title} text={content4.text} photo={content4.photo}/>
        </div>
    )
}

export default IntroduceAppInfo