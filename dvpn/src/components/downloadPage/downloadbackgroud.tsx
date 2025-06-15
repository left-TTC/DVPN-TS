
import "@/style/components/downloadPage/downloadBackgroud.css"
import icon from "@/assets/dvpn.png"
import android from "@/assets/android.svg"
import invite from "@/assets/copy.svg"
import { copyShare } from "@/utils/copyShare"
import { useTranslation } from "react-i18next"
import { downloadDVPN } from "@/utils/downloadApk"
import { useFixedToast } from "@/context/fixedToastProvider"
import { FixedToastType, type Message } from "@/utils/fixedToast"

const DownloadBackground = () => {
    const { t } = useTranslation();
    const fixtoast = useFixedToast()

    const download = () => {
        const copyOk = copyShare();
        if(copyOk){
            const copyOKMessage: Message = {
                title: t("download"),
                content: t("suredownload"),
                confirm: t("yes"),
                cancle: t("cancle")
            }
            fixtoast(copyOKMessage, FixedToastType.OK, ()=>{downloadDVPN();})
        }else{
            const copyFailMessage: Message = {
                title: t("copycodefail"),
                content: t("whycannot"),
                confirm: t("ok")
            }
            fixtoast(copyFailMessage, FixedToastType.Error)
        }
        
    }

    const copyInvitationCodes = () => {
        const copyOk = copyShare();
        if(copyOk){
            const copyOKMessage: Message = {
                title: t("copycodes"),
                content: t("youhavecopiedi"),
                confirm: t("done")
            }
            fixtoast(copyOKMessage, FixedToastType.OK)
        }else{
            const copyFailMessage: Message = {
                title: t("copycodefail"),
                content: t("whyfailcopycode"),
                confirm: t("ok")
            }
            fixtoast(copyFailMessage, FixedToastType.Error)
        }
    }

    return (
        <div className="photoBack">
            <div className="backimg" />

            <div className="downloadicon">
                <img src={icon} className="downloadDVPN"/>
                <h1>D-VPN</h1>
            </div>
            <div className="introduce">
                <h1>{t("theworldsfrist..")}</h1>
            </div>
            <div className="buttons">
                <button className="downloadD" onClick={() => download()}>
                    <h1>{t("download")}</h1>
                    <img src={android} className="android"/>
                </button>
                <button className="inviteD" onClick={() => copyInvitationCodes()}>
                    <h1>{t("invite")}</h1>
                    <img src={invite} className="invitepho"/>
                </button>
            </div>
        </div>
    )
}

export default DownloadBackground