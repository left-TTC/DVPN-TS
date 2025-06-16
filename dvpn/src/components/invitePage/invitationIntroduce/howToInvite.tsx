

import "swiper/css";
import "swiper/css/pagination";
import "@/style/components/invitePage/howToInvite.css"
import facebook from "@/assets/facebook-fill.svg"
import wechat from "@/assets/wechat-fill.svg"
import twwiter from "@/assets/twitter.svg"
import youtube from "@/assets/Youtube-fill.svg"
import orthers from "@/assets/orthers.svg"
import telegram from "@/assets/telegram.svg"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { generateInvitationLink } from "@/utils/generateInvitationLink";
import { useFixedToast } from "@/context/fixedToastProvider";
import { FixedToastType, type Message } from "@/utils/fixedToast";
import { turnToLinks } from "@/utils/turnToLinks";
import { DeviceType } from "@/utils/checkWhatDevice";

export interface howToInviteItem {
    img: string,
    title: string,
    way: string,
    link: string,
    links?: string,
}

const HowToInviteEffectively = () => {
    const {t} = useTranslation()

    const howToInviteRef = useRef<HTMLDivElement | null> (null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    const fixedToast = useFixedToast()

    useEffect(() => {
        const template = howToInviteRef.current
        if(template){
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    if(entry.isIntersecting && !hasAnimated){
                        setHasAnimated(true)
                        setTimeout(() => {
                            animate(template, {
                                opacity: [0,1],
                                translateY: -60
                            })
                        },200)

                        observerRef.current?.disconnect()
                    }
                },
                {threshold: 0.2}
            );
            observerRef.current.observe(template);
        }

        return () => {
            howToInviteRef.current = null
            observerRef.current?.disconnect();
        };
    },[])

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

    let content: howToInviteItem[] = []
    content[0] = {
        img: facebook,
        title: t("facebook"),
        way: t("facebookway"),
        link: t("facebooklink"),
        links: "fb://profile"
    }
    content[1] = {
        img: wechat,
        title: t("wechat"),
        way: t("wechatway"),
        link: t("wechatlink"),
        links: "weixin://"
    }
    content[2] = {
        img: twwiter,
        title: t("twwiter"),
        way: t("twwiterway"),
        link: t("twwiterlink"),
        links: "twitter://"
    }
    content[3] = {
        img: youtube,
        title: t("youtube"),
        way: t("youtubeway"),
        link: t("youtubelink"),
        links: "youtube://"
    }
    content[4] = {
        img: orthers,
        title: t("orthers"),
        way: t("orthersway"),
        link: t("ortherslink"),
    }
    content[5] = {
        img: telegram,
        title: t("telegram"),
        way: t("teleway"),
        link: t("telegramlink"),
        links: "tg://"
    }

    const copyShareAndOpenApp = async(title: string, links: string) =>{
        const ifLinkOK = await generateInvitationLink(t("invitatinwords"))
        if(ifLinkOK){
            const OkMessage: Message = {
                title: t("copy"),
                content: t("whycopy"),
                confirm: t("open"),
                cancle: t("cancle")
            }
            fixedToast(OkMessage, FixedToastType.OK, ()=>{turnToLinks(links)})
        }else{
            const failMessage: Message = {
                title: t("copyFail"),
                content: t("whycopyfail"),
                confirm: t("retry")
            }
            fixedToast(failMessage, FixedToastType.Error, ()=>{copyShareAndOpenApp(title, links)})
        }
    }

    const [sliderPerview, setSliderPerview] = useState(1.3)
    useEffect(() => {
        if(currentDeviceType === DeviceType.Phone){
            setSliderPerview(1.3)
        }else{
            setSliderPerview(1)
        }
    },[currentDeviceType])

    return(
        <div className="HowToInviteEffectively" ref={howToInviteRef}>
            <h1 >{t("howtoinvite")}</h1>
            <div className="inviteWayContainer">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={30}
                    slidesPerView={1.3}
                    pagination={{ clickable: true }}
                    loop={true}
                    centeredSlides={true}
                    style={{ paddingBottom: "40px" }}
                >
                    {content.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="whyinviteItem">
                                <div className="whyinviteitemimg">
                                    <img src={item.img} alt={item.title} className="slideImage" />
                                </div>
                                <h3 className="slideTitle">{item.title}</h3>
                                <h4 className="siideText">{item.way}</h4>
                                {item.links &&
                                    <a onClick={() => copyShareAndOpenApp(item.title, item.links!)}>{item.link}</a>
                                }
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default HowToInviteEffectively