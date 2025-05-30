

import "../style/components/wechatSkip.css"

import array from "../assets/array.svg"
import { useTranslation } from "react-i18next";

const WechatSkip = () =>{
    const { t } = useTranslation();

    return(
        <div className="wechatSkip">
            <div className="navigation">
                <h1>{t("plesevisit")}</h1>
                <img src={array} className="array"/>
            </div>
            <div style={{
                height: '1px',
                backgroundColor: 'white',
                width: '100%',
                opacity: '0.3'
            }} />   
        </div>
    )
}

export default WechatSkip