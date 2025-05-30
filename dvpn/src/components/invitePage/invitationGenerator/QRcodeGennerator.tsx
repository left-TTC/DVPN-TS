import React, { useEffect, useRef} from "react";
import { useInviteContext } from "../../../pages/invite";
import { useTranslation } from "react-i18next";
import { generateQRCodeTextAndLabel } from "../../../utils/generateQRCode";
import { QRCodeCanvas } from "qrcode.react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "../../../style/components/invitePage/QRcodeGenerator/QRcodeGenerator.css";

import ipfs from "../../../assets/ipfs.svg"
import domain from "../../../assets/domain.svg"

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

    const ifIpfs = (url: string) => {
        if(url.includes("ipfs") || url.includes("ipns")){
            return true
        }
        return false
    }

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
                    loop={true}
                    centeredSlides={true}
                    style={{ paddingBottom: "70px" }}
                >
                    {originalContext.map((url, index) => (
                        <SwiperSlide key={`${url.text}-${index}`}>
                            <div className="QROne">
                                <button className="domaintypeblock"  onClick={() => handleSaveQRCode(index)}>
                                    {ifIpfs(url.label)? (
                                        <img src={ipfs} className="ipfsimg"/>
                                    ):(
                                        <img src={domain} className="ipfsimg"/>
                                    )}
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
            </div>
        </div>
    );
};

export default QRcodeGenerator;
