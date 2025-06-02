
import "../style/components/topbar.css"

import change from "../assets/lan.svg"
import icon from "../assets/dvpn.png"
import { useWeChatContext } from "../context/wechatProvider"
import { useEffect, useState } from "react"
import i18n from '../i18n';
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"


export default function Topbar() {
    const {t} = useTranslation()

    const location = useLocation()
    const shouldShowWechatSkip = location.pathname === '/';

    const isWechat = useWeChatContext()
    const [ifShowLanguageChange, setIfShowLanguageChange] = useState(false)

    const [currentLan, setCurrentLan] = useState(i18n.language)
    useEffect(() => {
        setCurrentLan(i18n.language)
        console.log("now lan:", i18n.language)
    },[i18n.language])

    const ifActiveLan = (lang: string) => {
        return currentLan === lang;
    }

    const setLanguage = (lan: string) => {
        i18n.changeLanguage(lan),
        setIfShowLanguageChange(false)
    }

    return(
       <div className={(isWechat && shouldShowWechatSkip)? "topbar inwechat" : "topbar"}>
            <div className="lan" onClick={() =>setIfShowLanguageChange(!ifShowLanguageChange)}>
                <img src={change}  className="lanph"/>
            </div>
            <div className="iconAndName">
                <img src={icon} className="icon"/>
                <h1>D-VPN</h1>
            </div>
            {ifShowLanguageChange && 
                <div className="changeLanguageBlock">
                    <div className="languageItem" onClick={() => setLanguage("en-GB")}>
                        <div className="lanShow">
                            <h2>{t("english")}</h2>
                            {ifActiveLan("en-GB")? 
                                (<div className="dot" />) :
                                (<div className="dotno" />)
                            }
                        </div>
                        <h1>——</h1>
                        
                    </div>
                    <div className="languageItem" onClick={() => setLanguage("zh-CN")}>
                        <div className="lanShow">
                            <h2>{t("chinese")}</h2>
                            {ifActiveLan("zh-CN")? 
                                (<div className="dot" />) :
                                (<div className="dotno" />)
                            }
                        </div>
                        <h1>——</h1>
                    </div>
                    <div className="languageItem" onClick={() => setLanguage("ru")}>
                        <div className="lanShow">
                            <h2>{t("russian")}</h2>
                            {ifActiveLan("ru")? 
                                (<div className="dot" />) :
                                (<div className="dotno" />)
                            }
                        </div>
                        <h1>——</h1>
                    </div>            
                    <div className="languageItem" onClick={() => setLanguage("es")}>
                        <div className="lanShow">
                            <h2>{t("spanish")}</h2>
                            {ifActiveLan("es")? 
                                (<div className="dot" />) :
                                (<div className="dotno" />)
                            }
                        </div>
                        <h1>——</h1>
                    </div>            
                    <div className="languageItem" onClick={() => setLanguage("ar")}>
                        <div className="lanShow">
                            <h2>{t("arabic")}</h2>
                            {ifActiveLan("ar")? 
                                (<div className="dot" />) :
                                (<div className="dotno" />)
                            }
                        </div>
                    </div>                        
                </div>
            }
       </div> 
    )
}


