import { JsonD } from "@/utils/generateInvitationLink";
import { getQueryVariable } from "@/utils/getQueryVariable";


export interface QRcodeInfo{
    text: string,
    label: string
}

export function generateQRCodeTextAndLabel(): QRcodeInfo[] | []{
    const invitationCode = getQueryVariable('j');
    if (!invitationCode){
        return [];
    };

    const urlParams = new JsonD(invitationCode);
    let returnInfo: QRcodeInfo[] = [];

    for(const serve of urlParams.serve){
        const text = serve + '?r=' + urlParams.invitationCodes;
        const serveInfo: QRcodeInfo = {
            text: text,
            label: serve,
        } 
        returnInfo.push(serveInfo)
    }

    return returnInfo;
}