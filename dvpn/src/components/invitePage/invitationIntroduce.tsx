
import { useEffect, useRef, useState } from "react";
import { useInviteContext } from "../../pages/invite";
import "@/style/components/invitePage/InvitationIntroduce.css"
import { animate } from "animejs";
import { useTranslation } from "react-i18next";

import "@/style/components/invitePage/InvitationIntroduce.css"
import Whyinviteorthers, { imgPaths, type whyinviteorthersContext } from "./invitationIntroduce/whyInviteTemplate";
import HowToInviteEffectively from "@/components/invitePage/invitationIntroduce/howToInvite";
import { DeviceType } from "@/utils/checkWhatDevice";

export interface IntroduceProps{
    setDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvitationIntroduce: React.FC<IntroduceProps> = ({setDown}) => {
    const {ifShowQRCode} = useInviteContext()
    const downRef = useRef<HTMLDivElement | null>(null)
    const {t} = useTranslation()

    const [currentDeviceType, setCurrentDeviceType] = useState(() => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) return DeviceType.Phone;
            if (screenWidth >= 768 && screenWidth < 1550) return DeviceType.QR;
            if (screenWidth >= 1550 ) return DeviceType.Computer;
        });
            
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let newDevice;
            if (screenWidth < 768) {
                newDevice = DeviceType.Phone;
            } else if (screenWidth >= 768 && screenWidth < 1550) {
                newDevice = DeviceType.QR;
            } else {
                newDevice = DeviceType.Computer
            }
            if (newDevice !== currentDeviceType) {
                setCurrentDeviceType(newDevice);
                console.log("Device type changed to:", newDevice);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentDeviceType]);

    useEffect(() => {
        const animation = () => {
            const page = downRef.current;
            if(page){
                if(currentDeviceType === DeviceType.Phone){
                    animate(page, {
                        duration: 1200,
                        translateY: 890,
                        easing: 'easeInOutQuad',
                    })
                }else if(currentDeviceType === DeviceType.QR){
                    animate(page, {
                        duration: 1200,
                        translateY: [0,1600],
                        easing: 'easeInOutQuad',
                    })
                }else{
                    animate(page, {
                        duration: 1200,
                        translateY: [0, 1500],
                        easing: 'easeInOutQuad',
                    })
                }
                setDown(true)
            }
        }
        if(ifShowQRCode){
            animation()
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