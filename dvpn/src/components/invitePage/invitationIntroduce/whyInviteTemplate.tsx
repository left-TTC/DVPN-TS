

export interface whyinviteorthersContext{
    title: string,
    text: string,
    summarize: string
}

export interface WhyInviteOrthersProps {
    imgPath: imgPaths,
    content: whyinviteorthersContext,
}

export enum imgPaths{
    P2P,
    FWC,
}

import { useEffect, useRef, useState } from "react"
import p2p from "@/assets/p2p.png"
import fwc from "@/assets/fwc.png"
import "@/style/components/invitePage/inviteTemplate/whyInviteTemplate.css"
import { animate } from "animejs"

const Whyinviteorthers: React.FC<WhyInviteOrthersProps> = ({imgPath, content}) => {

    let path 
    let classname
    switch(imgPath){
        case imgPaths.P2P:
            path = p2p
            classname = "p2p"
            break
        case imgPaths.FWC:
            path = fwc
            classname = "fwc"
            break
    }

    const inviteTemplateRef = useRef<HTMLDivElement | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        const template = inviteTemplateRef.current
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
            inviteTemplateRef.current = null
            observerRef.current?.disconnect();
        };
    },[])

    return(
        <div className="whyInviteOrthers" ref={inviteTemplateRef}>
            <img src={path} className={`${classname}`}/>
            <div className="wordIntroduce">
                <h1 className="contentTitle">{content.title}</h1>
                <h2 className="contentText">{content.text}</h2>
                <h3 className="contentSum">{content.summarize}</h3>
            </div>
        </div>
    )
}

export default Whyinviteorthers 