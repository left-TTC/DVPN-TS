
import { useContext, useState } from "react"
import InvitationGenerator from "../components/invitePage/invitationGenerator"
import InvitationIntroduce from "../components/invitePage/invitationIntroduce"
import "../style/invite.css"
import { createContext } from "react";

interface InviteContextType {
    ifShowQRCode: boolean;
    setIfShowQRCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteContext = createContext<InviteContextType | undefined>(undefined);

export const useInviteContext = () => {
    const context = useContext(InviteContext);
    if (!context) {
        throw new Error("useInviteContext must be used within InviteProvider");
    }
    return context;
};


export default function InvitePage(){

    const [ifShowQRCode, setIfShowQRCode] = useState(false)
    const [ifIntroduceDown, setIfIntroduceDown] = useState(false)

    return(
        <InviteContext.Provider value={{ ifShowQRCode, setIfShowQRCode }}>
            <div className="invitePage">
                <InvitationGenerator ifIntroduceDown={ifIntroduceDown} />
                <InvitationIntroduce setDown={setIfIntroduceDown}/>
            </div>
        </InviteContext.Provider>
    )
}


