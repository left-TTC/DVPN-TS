import { getQueryVariable } from "@/utils/getQueryVariable";


export function copyShare() {
    const textArea = document.createElement("textarea");

    const j = getQueryVariable('r');
    if (j){
        textArea.value = j;
        document.body.appendChild(textArea);
        textArea.focus({ preventScroll: true });
        textArea.select();
        document.execCommand('copy');   
        console.log("OK")
    }else{
        console.log("no info")
    }
}


