



export function generateInvitation(QRcanvas: HTMLCanvasElement | null) {
    if(QRcanvas){
        const width = 1080
        const height = 1920

        const customCanvas = document.createElement("canvas")
        customCanvas.width = width;
        customCanvas.height = height;
        const ctx = customCanvas.getContext("2d");
        if (!ctx) return;

        const bgImage = new Image();
        bgImage.src = "./image/QRcodeBackg"
        
    }
}