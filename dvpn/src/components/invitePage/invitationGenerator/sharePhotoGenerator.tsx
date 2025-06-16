import type React from "react"
import "@/style/components/invitePage/QRcodeGenerator/sharePhotoGenerator.css"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { generateInvitationImg } from "@/utils/generateInviteImg"
import { ChooseLanguageType } from "../invitationGenerator"
import i18next from "i18next"

export interface receiveQRProps {
    QrRef: React.RefObject<HTMLCanvasElement> | null
    languageType: ChooseLanguageType
    TemplateRef: React.RefObject<HTMLDivElement | null>
    QrSize: number
}

export interface SharePhotoGeneratorRef {
    getSharePhoto: () => void
}

const SharePhotoGenerator = forwardRef<SharePhotoGeneratorRef, receiveQRProps>(
    ({ QrRef, languageType, TemplateRef, QrSize }, ref) => {
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
            switchLanguage(languageType)
        }, [languageType])

        const html2Ref = useRef<HTMLDivElement | null>(null)

        useImperativeHandle(ref, () => ({
            getSharePhoto: () => {
                generateInvitationImg(html2Ref.current)
            }
        }))

        const posterRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            console.log("template:", TemplateRef.current)
            if (QrRef?.current  && posterRef.current && TemplateRef.current) {
                posterRef.current.innerHTML = "";

                const clone = TemplateRef.current.cloneNode(true) as HTMLElement;
                const glow = clone.querySelector(".glowSelect")
                if(glow?.innerHTML){
                    glow.innerHTML = ""
                }

                const qrPlaceholder = clone.querySelector(".qrbox") as HTMLElement;
                const canvas = QrRef.current;
                const dataURL = canvas.toDataURL("image/png");

                const img = new Image();
                img.src = dataURL;
                img.alt = "QR Code";
                img.style.width = `${QrSize}px`;
                img.style.height = `${QrSize}px`;

                if (qrPlaceholder) {
                    qrPlaceholder.innerHTML = ""; 
                    Object.assign(qrPlaceholder.style, {
                        marginBottom: "40px",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "30px",
                });
                    qrPlaceholder.appendChild(img);
                }
                posterRef.current.appendChild(clone);
                posterRef.current.style.width = "96%"
                posterRef.current.style.margin = "0"
                if(QrSize > 250){
                    posterRef.current.style.maxWidth = "98%"
                    posterRef.current.style.marginTop = "30px"
                    posterRef.current.style.marginBottom = "30px"
                }
            }
        }, [QrRef, t, TemplateRef])

        return (
            <div className="SharePhotoGeneratorBox" ref={html2Ref}>
                <div ref={posterRef}/>
            </div>
        )
    }
)

export default SharePhotoGenerator
