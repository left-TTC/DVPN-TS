import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useInviteContext } from "@/pages/invite";
import { useTranslation } from "react-i18next";
import { generateQRCodeTextAndLabel } from "@/utils/generateQRCode";
import { QRCodeCanvas } from "qrcode.react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "@/style/components/invitePage/QRcodeGenerator/QRcodeGenerator.css";

import { ChooseLanguageType } from "@/components/invitePage/invitationGenerator";
import { useFixedToast } from "@/context/fixedToastProvider";
import { FixedToastType, type Message } from "@/utils/fixedToast";
import SharePhotoGenerator, { type SharePhotoGeneratorRef } from "./sharePhotoGenerator";

import dvpn from "@/assets/dvpn.png"

export interface QRcodeGeneratorProps {
    ifdrawing: boolean;
    setDrawingState: React.Dispatch<React.SetStateAction<boolean>>;
    // openChooseBlock: React.Dispatch<SetStateAction<boolean>>;
    // languageType: ChooseLanguageType;
}

const enumToLng = (lang: ChooseLanguageType): string => {
    switch (lang) {
        case ChooseLanguageType.English:
            return "en";
        case ChooseLanguageType.Chinese:
            return "zh";
        case ChooseLanguageType.Russian:
            return "ru";
        case ChooseLanguageType.Spanish:
            return "es";
        case ChooseLanguageType.Arabic:
            return "ar";
        default:
            return "en";
    }
};

const QRcodeGenerator: React.FC<QRcodeGeneratorProps> = ({
    ifdrawing,
    setDrawingState,
}) => {
    const { t } = useTranslation();
    const { setIfShowQRCode } = useInviteContext();
    const { i18n } = useTranslation();

    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const generatorRef = useRef<SharePhotoGeneratorRef>(null);
    const hasChecked = useRef(false);

    const fixedToast = useFixedToast();

    const originalContext = generateQRCodeTextAndLabel();

    const [currentCanvasElement, setCurrentCanvasElement] = useState<HTMLCanvasElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const checkAllQRcodeOK = () => {
            const allOk = canvasRefs.current.every(
                (canvas) => canvas && canvas.toDataURL().length > 100
            );

            if (allOk && !hasChecked.current) {
                hasChecked.current = true;
                setDrawingState(false);
                setIfShowQRCode(true);

                const successMsg: Message = {
                    title: t("generateQROk"),
                    content: t("howgenerateQr"),
                    confirm: t("ok")
                };
                fixedToast(successMsg, FixedToastType.OK);

                if (canvasRefs.current[0]) {
                    setCurrentCanvasElement(canvasRefs.current[0]);
                }
            } else {
                const errorMsg: Message = {
                    title: t("generatefail"),
                    content: t("whyGenerateerror"),
                    confirm: t("retry")
                };
                fixedToast(errorMsg, FixedToastType.Error, () => {
                    checkAllQRcodeOK();
                });
            }
        };

        if (ifdrawing) {
            checkAllQRcodeOK();
        }
    }, [ifdrawing, setDrawingState, setIfShowQRCode]);

    useEffect(() => {
        const updateCurrentCanvas = () => {
            const canvas = canvasRefs.current[activeIndex];
            if (canvas && canvas.toDataURL().length > 100) {
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

    const nowLanguageLists: ChooseLanguageType[] = reArrangeLanguage(i18n.language)

    const returnEmoji = () => {
        const emojis = ["🥰", "😘", "😋", "🤩", "🐱", "🌞", "🐼", "👻", "🤗", "🥳", "🎃"];
        return emojis[Math.floor(Math.random() * emojis.length)];
    };

    const ifChinese = (usingLan: ChooseLanguageType) => {
        return usingLan === ChooseLanguageType.Chinese
    }

    const colors = ["redglow", "greenglow", "blueglow", "purpleglow", "yellowglow", "whiteglow"];
    const [shuffledColors, setShuffledColors] = useState<string[]>([]);

    useEffect(() => {
        const shuffled = shuffleArray(colors);
        setShuffledColors(shuffled);
    }, []);

    const handleSaveQRCode = () => {
        if(generatorRef.current){
            const generateQRMessage: Message = {
                title: t("readyToGenerate"),
                content: t("readygeneratecontent"),
                confirm: t("confirm"),
                cancle: t("cancle")
            }
            fixedToast(generateQRMessage, FixedToastType.OK, ()=>{generatorRef.current!.getSharePhoto()})
        }else{
            const generateQRfailMessage: Message = {
                title: t("failtogenerate"),
                content: t("whyfailgenerate"),
                confirm: t("exit")
            }
            fixedToast(generateQRfailMessage, FixedToastType.Error)
        } 
    }

    const QRgeneratorRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className="QRcodeGenerator"> 
            <div className="QRContainer">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    slidesPerView={1.1}
                    pagination={{ clickable: true }}
                    loop={true}
                    centeredSlides={true}
                    style={{ paddingBottom: "80px" }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {nowLanguageLists.map((lang, index) => (
                        <SwiperSlide key={lang} >
                            <div className="QROne"  ref={QRgeneratorRef}>
                                <div className="glowSelect">
                                    <div className={`QRglow ${shuffledColors[index]}`} />
                                </div>
                                <div className="iconBlcok">
                                    <img src={dvpn} className="dvpnIconOnQR"/>
                                    <h4>{t("devpn", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h4>
                                </div>
                                
                                <div className={`wordblock ${ifChinese(nowLanguageLists[activeIndex])? 'chinese':``}`}>
                                    <h1>•{t("mobliephone", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h1>
                                    <h2>•{t("moreinvite", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h2>
                                    <h3>•{t("realphone", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h3>
                                    <h2>•{t("moreinvite", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h2>
                                    <h3>•{t("makeyoubetternetwork", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h3>
                                    <h5>{t("completelyFree", { lng: enumToLng(nowLanguageLists[activeIndex]) })}</h5>
                                </div>
                                <div className="qrbox">
                                    <QRCodeCanvas
                                        value={originalContext!.text}
                                        size={250}
                                        level="H"
                                        className="QRCodeCanvas"
                                        ref={(el) => {
                                            canvasRefs.current[index] = el;
                                            if (index === activeIndex && el && el.toDataURL().length > 100) {
                                                setCurrentCanvasElement(el);
                                            }
                                        }}
                                    />
                                </div>
                                
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                    <button className="domaintypeblock" onClick={() => handleSaveQRCode()}>
                        <h1>{t("clicktosaveQRcode")}</h1>
                        <h2>{returnEmoji()}</h2>
                    </button> 
                </div>
                <SharePhotoGenerator QrRef={currentCanvasRefObj} languageType={nowLanguageLists[activeIndex]} TemplateRef={QRgeneratorRef} ref={generatorRef}/>
            </div>
        </div>
    );
};

export default QRcodeGenerator;

function reArrangeLanguage(nowLanguage: string): ChooseLanguageType[] {

    const allLanguages: ChooseLanguageType[] = [
        ChooseLanguageType.Chinese,
        ChooseLanguageType.English,
        ChooseLanguageType.Russian,
        ChooseLanguageType.Spanish,
        ChooseLanguageType.Arabic
    ];

    const map: Record<string, ChooseLanguageType> = {
        "zh": ChooseLanguageType.Chinese,
        "zh-CN": ChooseLanguageType.Chinese,
        "en": ChooseLanguageType.English,
        "en-GB": ChooseLanguageType.English,
        "en-US": ChooseLanguageType.English,
        "ru": ChooseLanguageType.Russian,
        "es": ChooseLanguageType.Spanish,
        "ar": ChooseLanguageType.Arabic
    };

    const current = map[nowLanguage] || ChooseLanguageType.English;

    const filtered = allLanguages.filter(lang => lang !== current);
    return [current, ...filtered];
}

export function shuffleArray(array: string[]) {
    const result = [...array]; // 复制原数组，避免修改原始数据
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 随机索引
        [result[i], result[j]] = [result[j], result[i]]; // 交换元素
    }
    return result;
}
