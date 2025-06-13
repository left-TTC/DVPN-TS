import type React from "react";
import { useState, type SetStateAction } from "react";
import { ChooseLanguageType } from "../invitationGenerator";

import "@/style/components/invitePage/inviteTemplate/languageChooser.css"
import { useTranslation } from "react-i18next";
import { ToastTypes, useToast } from "@/context/toastProvider";

export interface LanguageChooserProps{
    closeChooseBlock: React.Dispatch<SetStateAction<boolean>>;
    chooseLanguage: React.Dispatch<SetStateAction<ChooseLanguageType>>
}


const LanguageChooser: React.FC<LanguageChooserProps> = ({closeChooseBlock, chooseLanguage}) => {

    const {t} = useTranslation()
    const toast = useToast()

    const [selectIndex, setSelectIndex] = useState<number | null>(null)

    const closeLanguageChooser = () =>{
        closeChooseBlock(false)
        setSelectIndex(null)
    }

    const selectLanguage = (index: number) => {
        setSelectIndex(index)
    }

    const comfirmLanguage = () => {
        if(selectIndex === null){
            toast(t("chooselanguagefrist"), ToastTypes.Error, 1000)
            return
        }

        console.log("now index:", selectIndex)

        switch(selectIndex){
            case 0:
                chooseLanguage(ChooseLanguageType.English)
                break
            case 1:
                chooseLanguage(ChooseLanguageType.Chinese)
                break
            case 2:
                chooseLanguage(ChooseLanguageType.Spanish)
                break
            case 3:
                chooseLanguage(ChooseLanguageType.Russian)
                break
            case 4:
                chooseLanguage(ChooseLanguageType.Arabic)
                break
        }
        closeChooseBlock(false)
        setSelectIndex(null)    
    }

    const lanMap: string[] = [
        t("english"),
        t("chinese"),
        t("spanish"),
        t("russian"),
        t("arabic"),
    ]

    return(
        <div className="chooserPage">
            <div className="chooserBlcok">
                <h1>{t("selectlanguage")}</h1>
                <div className="languageclass">
                    {lanMap.map((lang, index) => (
                        <div className={`languageclassitem ${selectIndex === index ? "selected" : ""}`}key={index} onClick={() => selectLanguage(index)}>
                            {lang}
                        </div>
                    ))}
                </div>
                <div className="buttonBlock">
                    <button className="chooserPagecon" onClick={comfirmLanguage}>
                        {t("confirm")}
                    </button>
                    <button className="chooserPagecon" onClick={closeLanguageChooser}>
                        {t("cancle")}
                    </button>
                </div>
            </div>
            <div className="blackBack"/>
        </div>
    )
}


export default LanguageChooser