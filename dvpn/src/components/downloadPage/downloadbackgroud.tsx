
import "../../style/components/downloadPage/downloadBackgroud.css"
import icon from "../../assets/dvpn.png"
import android from "../../assets/android.svg"
import invite from "../../assets/copy.svg"
import { copyShare } from "../../utils/copyShare"
import { useTranslation } from "react-i18next"
import { downloadDVPN } from "../../utils/downloadApk"

const DownloadBackground = () => {
    const { t } = useTranslation();

    const download = () => {
        copyShare();
        downloadDVPN();
    }

    const copyInvitationCodes = () => {
        copyShare();
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