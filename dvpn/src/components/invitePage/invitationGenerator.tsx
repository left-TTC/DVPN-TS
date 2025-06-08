

import { useTranslation } from "react-i18next"
import icon from "../../assets/dvpn.png"

import "../../style/components/invitePage/invitationGenerator.css"

import link from "../../assets/link.svg"
import QR from "../../assets/QR.svg"
import OK from "../../assets/ok.svg"
import loading from "../../assets/loading.svg"
import { useEffect, useRef, useState } from "react"
import { generateInvitationLink } from "../../utils/generateInvitationLink"
import QRcodeGenerator from "./invitationGenerator/QRcodeGennerator"
import { useInviteContext } from "../../pages/invite"
import { animate } from "animejs"

export interface InvitationGeneratorProps{
    ifIntroduceDown: boolean,
}

const InvitationGenerator: React.FC<InvitationGeneratorProps> = ({ifIntroduceDown}) => {

    const { t } = useTranslation()

    const [ifLinkOk, setIfLinkOk] = useState(false)

    const generateLink = async() => {
        const copyRes = await generateInvitationLink(t("invitatinwords"))

        if(copyRes){
            setIfLinkOk(true)
            setTimeout(() => {
                setIfLinkOk(false)
            }, 4000)
        }
    }

    const [ifDrawingQRcode, setIfDrawingQRcode] = useState(false)
    const {ifShowQRCode} = useInviteContext()
    const loadRef = useRef<HTMLImageElement | null>(null)
    const QRRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(ifDrawingQRcode){
            const loading = loadRef.current;
            if(loading){
                animate(loading, {
                    rotate: '360deg',
                    loop: true,
                    easing: 'linear',
                    duration: 1000, 
                })
            }
        }
    }, [ifDrawingQRcode])

    const generateQRcode = () => {
        if(!ifShowQRCode){
            setIfDrawingQRcode(true)
        }
    }

    useEffect(() => {
        const QR = QRRef.current;
        console.log("introdduce:", ifIntroduceDown)
        console.log("introdduce:", ifIntroduceDown)
        if(QR && ifShowQRCode && ifIntroduceDown){
            console.log("animate now")
            setTimeout(() => {
                animate(QR, {
                    opacity: [0, 1],
                    duration: 1200,
                    easing: 'easeInOutQuad',
                })
            },300)
        }
    }, [ifShowQRCode, ifIntroduceDown])

    return(
        <div className="InvitationGenerator">
            <div className="Inbackimg" />

            <div className="InvitationGeneratorTitle">
                <h1>{t("inviteortheruser")}</h1>
                <h2>{t("getmorenodes")}</h2>
            </div>

            <button className="InvitationGeneratorTitlecopyinvitationcodes" onClick={() => generateLink()}>
                <h1>{t("generateinvitationlick")}</h1>
                {!ifLinkOk? (
                    <img src={link} className="copyinvitationcodesimg"/>
                ):(
                    <img src={OK} className="invitationOKimg"/>
                )}
            </button>
            <button className="InvitationGeneratorTitlegenerateQRcode" onClick={() => generateQRcode()}>
                <h1>{t("generateinvitationQR")}</h1>
                {!ifDrawingQRcode && !ifShowQRCode &&
                    <img src={QR} className="generateQRcode"/>
                }
                {ifDrawingQRcode && !ifShowQRCode &&
                    <img ref={loadRef} src={loading} className="invitationOKimg2"/>
                }
                {!ifDrawingQRcode && ifShowQRCode &&
                    <img src={OK} className="invitationOKimg2"/>
                }
            </button>
            <div className="InvitationGeneratorQRblock" ref={QRRef}>
                <QRcodeGenerator ifdrawing={ifDrawingQRcode} setDrawingState={setIfDrawingQRcode}/>
            </div>
        </div>
    )
}


export default InvitationGenerator