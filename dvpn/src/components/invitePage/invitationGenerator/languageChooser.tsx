import type React from "react";
import type { SetStateAction } from "react";
import type { ChooseLanguageType } from "../invitationGenerator";

import "@/style/components/invitePage/inviteTemplate/languageChooser.css"

export interface LanguageChooserProps{
    closeChooseBlock: React.Dispatch<SetStateAction<boolean>>;
    chooseLanguage: React.Dispatch<SetStateAction<ChooseLanguageType>>
}


const LanguageChooser: React.FC<LanguageChooserProps> = ({closeChooseBlock, chooseLanguage}) => {

    const closeLanguageChooser = () =>{
        closeChooseBlock(false)
    }

    return(
        <div className="chooserPage">
            <div className="chooserBlcok">
                <div className="languageclass">
                    
                </div>
                <div className="buttonBlock">
                    <button className="chooserPagecon">
                        confirm
                    </button>
                    <button className="chooserPagecancle" onClick={closeLanguageChooser}>
                        cancle
                    </button>
                </div>
            </div>
            <div className="blackBack"/>
        </div>
    )
}


export default LanguageChooser