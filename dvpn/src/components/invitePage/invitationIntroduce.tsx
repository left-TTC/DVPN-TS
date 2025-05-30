
import { useEffect, useRef } from "react";
import { useInviteContext } from "../../pages/invite";
import "../../style/components/invitePage/InvitationIntroduce.css"
import { animate } from "animejs";

export interface IntroduceProps{
    setDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvitationIntroduce: React.FC<IntroduceProps> = ({setDown}) => {
    const {ifShowQRCode} = useInviteContext()
    const downRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(ifShowQRCode){
            const page = downRef.current;
            if(page){
                animate(page, {
                    duration: 1200,
                    translateY: 680,
                    easing: 'easeInOutQuad',
                })
                setDown(true)
            }
        }
    }, [ifShowQRCode])

    return(
        <div className="InvitationIntroduce" ref={downRef}>
            
        </div>
    )
}

export default InvitationIntroduce