import type React from "react"
import "@/style/components/invitePage/QRcodeGenerator/sharePhotoGenerator.css"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import DVPN from "@/assets/dvpn.png"
import { generateInvitationImg } from "@/utils/generateInviteImg"
import { ChooseLanguageType } from "../invitationGenerator"
import { ToastTypes, useToast } from "@/context/toastProvider"
import i18next from "i18next"

export interface receiveQRProps {
    QrRef: React.RefObject<HTMLCanvasElement> | null
    languageType: ChooseLanguageType
    canChangeLanguage: boolean
    setCanChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SharePhotoGeneratorRef {
    getSharePhoto: () => void
    canGeneratePhoto: boolean
    changeGenerateStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const SharePhotoGenerator = forwardRef<SharePhotoGeneratorRef, receiveQRProps>(
    ({ QrRef, languageType, canChangeLanguage, setCanChangeLanguage }, ref) => {
        const toast = useToast()
        const [t, setT] = useState<(key: string) => string>(() => (key: string) => key)

        const switchLanguage = async (lan: ChooseLanguageType) => {
            let lng = ""
            switch (lan) {
                case ChooseLanguageType.English:
                    lng = "en-GB"
                    break
                case ChooseLanguageType.Chinese:
                    lng = "zh"
                    break
                case ChooseLanguageType.Spanish:
                    lng = "es"
                    break
                case ChooseLanguageType.Russian:
                    lng = "ru"
                    break
                case ChooseLanguageType.Arabic:
                    lng = "ar"
                    break
                default:
                    return false
            }

            const local = await i18next.cloneInstance({ lng, fallbackLng: "en-GB" })
            setT(() => local.t.bind(local))
            return true
        }

        useEffect(() => {
            switchLanguage(languageType).then(setCanChangeLanguage)
        }, [languageType])

        const html2Ref = useRef<HTMLDivElement | null>(null)

        useImperativeHandle(ref, () => ({
            getSharePhoto: () => {
                if (canChangeLanguage) {
                    generateInvitationImg(html2Ref.current)
                } else {
                    toast(t("chooselanguagefrist"), ToastTypes.Error, 1000)
                }
            },
            canGeneratePhoto: canChangeLanguage,
            changeGenerateStatus: setCanChangeLanguage,
        }))

        const qrContainerRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            if (QrRef?.current && qrContainerRef.current) {
                qrContainerRef.current.innerHTML = ""

                const image = new Image()
                image.src = QrRef.current.toDataURL("image/png")
                image.style.width = "240px"
                image.style.height = "240px"
                image.style.margin = "auto"
                image.style.marginTop = "5px"

                const label = document.createElement("div")
                label.innerText = t("scantodownload")
                label.style.marginTop = "12px"
                label.style.fontSize = "14px"
                label.style.fontWeight = "500"
                label.style.textAlign = "center"
                label.style.color = "#08BBFF"
                label.style.marginTop = "3px"

                qrContainerRef.current.appendChild(label)
                qrContainerRef.current.appendChild(image)
            }
        }, [QrRef, t])

        return (
            <div className="SharePhotoGeneratorBox" ref={html2Ref}>
                <div className="introduceBox p2p">
                    <h1 className="p2pcommunication">{t("p2pcommunication")}</h1>
                    <div className="Dot blue" />
                </div>
                <div className="introduceBox break">
                    <div className="Dot green" />
                    <h1 className="breakNetwork">{t("breakNetwork")}</h1>
                </div>
                <div className="introduceBox local">
                    <h1 className="breakNetwork">{t("breakelocal")}</h1>
                    <div className="Dot red" />
                </div>
                <div className="introduceBox safe">
                    <div className="Dot purple" />
                    <h1 className="breakNetwork">{t("saferAndStable")}</h1>
                </div>
                <div className="sharePhotoTitle">
                    <div className="DVPNBox">
                        <img src={DVPN} className="sharePhotoDvpn" />
                        <h1 className="sharePhotoDVPN">D-VPN</h1>
                    </div>
                    <h2>——{t("theworldsfrist..")}</h2>
                </div>
                <div ref={qrContainerRef} className="sharePhotoQRcodeContainer" />
            </div>
        )
    }
)

export default SharePhotoGenerator
