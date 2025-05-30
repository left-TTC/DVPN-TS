
import "../style/components/topbar.css"

import change from "../assets/lan.svg"
import icon from "../assets/dvpn.png"
import { useWeChatContext } from "../context/wechatProvider"


export default function Topbar() {

    const isWechat = useWeChatContext()

    return(
       <div className={isWechat? "topbar inwechat" : "topbar"}>
            <div className="lan">
                <img src={change}  className="lanph"/>
            </div>
            <div className="iconAndName">
                <img src={icon} className="icon"/>
                <h1>D-VPN</h1>
            </div>
       </div> 
    )
}


