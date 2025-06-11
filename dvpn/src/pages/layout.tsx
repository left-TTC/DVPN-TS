import { Outlet, useLocation } from "react-router-dom";
import Topbar from "@/components/topbar";
import WechatSkip from "@/components/wechatSkip";


export default function Layout() {

    const location = useLocation()
    const shouldShowWechatSkip = location.pathname === '/';

    return (
        <div style={{ 
            display: "flex",
            flexDirection: "column",
            width: "100vw",      
            overflowX: "hidden",  
            minHeight: "100vh"      
        }}> 
            
            {shouldShowWechatSkip && <WechatSkip />}
            
            <Topbar />
            <div style={{ 
                flex: 1,       
                overflow: "hidden"  
            }}>
                <Outlet />
            </div>  
        </div>
    )
}