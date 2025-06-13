import React, { useEffect, useMemo, useRef, useState, type SetStateAction} from "react";
import { useInviteContext } from "@/pages/invite";
import { useTranslation } from "react-i18next";
import { generateQRCodeTextAndLabel } from "@/utils/generateQRCode";
import { QRCodeCanvas } from "qrcode.react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "@/style/components/invitePage/QRcodeGenerator/QRcodeGenerator.css";
import SharePhotoGenerator, { type SharePhotoGeneratorRef } from "./sharePhotoGenerator";
import type { ChooseLanguageType } from "@/components/invitePage/invitationGenerator";


export interface QRcodeGeneratorProps {
    ifdrawing: boolean
    setDrawingState: React.Dispatch<React.SetStateAction<boolean>>;
    openChooseBlock: React.Dispatch<SetStateAction<boolean>>;
    languageType: ChooseLanguageType
}

const QRcodeGenerator: React.FC<QRcodeGeneratorProps> = ({ ifdrawing, setDrawingState, openChooseBlock, languageType }) => {
    const { t } = useTranslation();
    const { setIfShowQRCode } = useInviteContext();

    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const hasChecked = useRef(false);

    let originalContext = generateQRCodeTextAndLabel();

    const [currentCanvasElement, setCurrentCanvasElement] = useState<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const checkAllQRcodeOK = () => {
            const allOk = canvasRefs.current.every(
                (canvas) => canvas && canvas.toDataURL().length > 100
            );

            if (allOk && !hasChecked.current) {
                hasChecked.current = true;
                setDrawingState(false);
                setIfShowQRCode(true);

                if (canvasRefs.current[0]) {
                    setCurrentCanvasElement(canvasRefs.current[0]);
                }
            } else {
                setTimeout(checkAllQRcodeOK, 100);
            }
        };

        if(ifdrawing){
            checkAllQRcodeOK();
        }
    }, [ifdrawing, setDrawingState, setIfShowQRCode]); 

    const generatorRef = useRef<SharePhotoGeneratorRef>(null);

    const handleSaveQRCode = () => {
        openChooseBlock(true)
    };

    const [canChangeLanguage, setCanChangeLanguage] = useState(false)

    useEffect(() => {
        console.log("ready for keep:", generatorRef.current?.canGeneratePhoto)
        if(canChangeLanguage){
            generatorRef.current?.getSharePhoto();
            setCanChangeLanguage(false)
        }
    },[canChangeLanguage])

    const returnEmoji = () => {
        const emojis = ["🥰", "😘", "😋", "🤩", "🐱", "🌞", "🐼", "👻", "🤗", "🥳", "🎃"];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    const shouldLoop = originalContext.length > 2;

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {   
        const updateCurrentCanvas = () => {
            const canvas = canvasRefs.current[activeIndex];
            if (canvas && canvas.toDataURL().length > 100) { // 确保画布已完全绘制
                setCurrentCanvasElement(canvas);
            } else {
                setTimeout(updateCurrentCanvas, 100);
            }
        };

        if (ifdrawing) { 
            updateCurrentCanvas();
        } else if (canvasRefs.current[activeIndex]) {
            setCurrentCanvasElement(canvasRefs.current[activeIndex]);
    }


    }, [activeIndex, ifdrawing]); 

    const currentCanvasRefObj = useMemo(() => {
        return { current: currentCanvasElement } as React.RefObject<HTMLCanvasElement>;
    }, [currentCanvasElement]);


    return (
        <div className="QRcodeGenerator">
            <h1>{t("QRcode")}</h1>
            <h3>{t("clickshare")}</h3>
            <h4>{t("switch")}</h4>
            <h2>{t("takescreenshotor")}</h2>

            <div className="QRContainer">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    pagination={{ clickable: true }}
                    loop={shouldLoop}
                    centeredSlides={true}
                    style={{ paddingBottom: "40px" }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {originalContext.map((url, index) => (
                        <SwiperSlide key={`${url.text}-${index}`}>
                            <div className="QROne">
                                <button className="domaintypeblock"  onClick={() => handleSaveQRCode()}>
                                    <div className="QRcodescreenshotintroduce">
                                        <h1>{t("clicktosaveQRcode")}</h1>
                                    </div>
                                    <h1>{returnEmoji()}</h1>
                                </button>
                                <p>{t("scanitandownloadapp")}</p>
                                <QRCodeCanvas
                                    value={url.text}
                                    size={200}
                                    level="H"
                                    style={{ backgroundColor: "white",marginBottom:'40px',padding:'10px' }}
                                    ref={(el) => {
                                        canvasRefs.current[index] = el;
                                        if (index === activeIndex && el && el.toDataURL().length > 100) {
                                            setCurrentCanvasElement(el);
                                        }
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <h1>{t("experiencebetter")}</h1>
                <h2>{t("makeyoubetternetwork")}</h2>
                <h3>{t("usedvpn")}</h3>
                <SharePhotoGenerator QrRef={currentCanvasRefObj} languageType={languageType} canChangeLanguage={canChangeLanguage} setCanChangeLanguage={setCanChangeLanguage} ref={generatorRef}/>
            </div>
        </div>
    );
};

export default QRcodeGenerator;