import { getQueryVariable } from "./getQueryVariable";

export function copyShare() {
    const j = getQueryVariable('r');
    if (!j) return false;

    if (navigator.clipboard && window.isSecureContext) {
        // ✅ 使用 Clipboard API，不会弹出键盘
        navigator.clipboard.writeText(j).catch((err) => {
            console.warn("Clipboard write failed:", err);
        });
    } else {
        // ⚠️ fallback 方法，但避免 focus，防止弹出键盘
        const textArea = document.createElement("textarea");
        textArea.value = j;
        textArea.setAttribute("readonly", ""); // 避免触发键盘
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px"; // 移出屏幕
        document.body.appendChild(textArea);
        textArea.select(); // 选中，但不要 focus
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    return true;
}
