import React, { useEffect, useRef} from "react";
import { useInviteContext } from "@/pages/invite";
import { useTranslation } from "react-i18next";
import { generateQRCodeTextAndLabel } from "@/utils/generateQRCode";
import { QRCodeCanvas } from "qrcode.react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

    import "@/style/components/invitePage/QRcodeGenerator/QRcodeGenerator.css";


export interface QRcodeGeneratorProps {
    ifdrawing: boolean
    setDrawingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const QRcodeGenerator: React.FC<QRcodeGeneratorProps> = ({ ifdrawing, setDrawingState }) => {
    const { t } = useTranslation();
    const { setIfShowQRCode } = useInviteContext();

    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const hasChecked = useRef(false);

    let originalContext = generateQRCodeTextAndLabel();

    useEffect(() => {
        const checkAllQRcodeOK = () => {
            const allOk = canvasRefs.current.every(
                (canvas) => canvas && canvas.toDataURL().length > 100
            );
            console.log("checking")

            if (allOk && !hasChecked.current) {
                hasChecked.current = true;
                setDrawingState(false);
                setIfShowQRCode(true);
                console.log("draw ok")
            } else {
                setTimeout(checkAllQRcodeOK, 100);
            }
        };

        if(ifdrawing){
            checkAllQRcodeOK()
        }
    }, [ifdrawing]);


    const handleSaveQRCode = (index: number) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;

        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = `qrcode-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const returnEmoji = () => {
        const randomInt = Math.floor(Math.random() * 11);
        switch(randomInt){
            case 0:
                return "🥰"
            case 1:
                return "😘"
            case 2:
                return "😋"
            case 3:
                return "🤩"
            case 4:
                return "🐱"
            case 5:
                return "🌞"
            case 6:
                return "🐼"
            case 7:
                return "👻"
            case 8:
                return "🤗"
            case 9:
                return "🥳"
            default:
                return "🎃"
        }
    }

    const shouldLoop = originalContext.length > 2;

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
                >
                    {originalContext.map((url, index) => (
                        <SwiperSlide key={`${url.text}-${index}`}>
                            <div className="QROne">
                                <button className="domaintypeblock"  onClick={() => handleSaveQRCode(index)}>
                                    <div className="QRcodescreenshotintroduce">
                                        <h1>{t("scanitandownloadapp")}</h1>
                                    </div>
                                    <h1>{returnEmoji()}</h1>
                                </button>
                                <p>service {index + 1}</p>
                                <QRCodeCanvas
                                    value={url.text}
                                    size={200}
                                    level="H"
                                    style={{ backgroundColor: "white",marginBottom:'40px',padding:'10px' }}
                                    ref={(el) => { canvasRefs.current[index] = el; }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <h1>{t("experiencebetter")}</h1>
                <h2>{t("makeyoubetternetwork")}</h2>
                <h3>{t("usedvpn")}</h3>
            </div>
        </div>
    );
};

export default QRcodeGenerator;
