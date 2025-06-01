

import "swiper/css";
import "swiper/css/pagination";
import "../../../style/components/invitePage/howToInvite.css"
import facebook from "../../../assets/facebook-fill.svg"
import wechat from "../../../assets/wechat-fill.svg"
import twwiter from "../../../assets/twitter.svg"
import youtube from "../../../assets/Youtube-fill.svg"
import orthers from "../../../assets/orthers.svg"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export interface howToInviteItem {
    img: string,
    title: string,
    way: string,
}

const HowToInviteEffectively = () => {
    const {t} = useTranslation()

    const howToInviteRef = useRef<HTMLDivElement | null> (null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

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

    let content: howToInviteItem[] = []
    content[0] = {
        img: facebook,
        title: t("facebook"),
        way: t("facebookway"),
    }
    content[1] = {
        img: wechat,
        title: t("wechat"),
        way: t("wechatway"),
    }
    content[2] = {
        img: twwiter,
        title: t("twwiter"),
        way: t("twwiterway"),
    }
    content[3] = {
        img: youtube,
        title: t("youtube"),
        way: t("youtubeway"),
    }
    content[4] = {
        img: orthers,
        title: t("orthers"),
        way: t("orthersway"),
    }

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
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default HowToInviteEffectively