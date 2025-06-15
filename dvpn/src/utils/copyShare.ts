import { getQueryVariable } from "./getQueryVariable";

export function copyShare() {
    const j = getQueryVariable('r');
    if (!j) return false;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(j).catch((err) => {
            console.warn("Clipboard write failed:", err);
        });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = j;
        textArea.setAttribute("readonly", ""); 
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px"; 
        document.body.appendChild(textArea);
        textArea.select(); 
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    return true;
}
