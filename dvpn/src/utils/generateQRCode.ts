import { JsonD } from "@/utils/generateInvitationLink";
import { getQueryVariable } from "@/utils/getQueryVariable";


export interface QRcodeInfo{
    text: string,
    label: string
}

export function generateQRCodeTextAndLabel(): QRcodeInfo | null{
    const invitationCode = getQueryVariable('j');
    if (!invitationCode){
        return null;
    };

    const urlParams = new JsonD(invitationCode);
    const text = urlParams.serve[0] + '?r=' + urlParams.invitationCodes;
    let returnInfo: QRcodeInfo = {
        text: text,
        label: urlParams.serve[0]
    };


    return returnInfo;
}