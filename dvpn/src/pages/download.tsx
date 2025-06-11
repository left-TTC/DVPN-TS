

import AppInfo from "@/components/downloadPage/appInfo"
import DownloadBackground from "@/components/downloadPage/downloadbackgroud"
import { useWeChatContext } from "@/context/wechatProvider";
import "@/style/download.css"

export default function DownloadPage(){

    const isWeChat = useWeChatContext();

    return(
        <div className={isWeChat ? "downloadPage noWechat" : "downloadPage"}>
            <DownloadBackground />
            <AppInfo />
        </div>
    )
}