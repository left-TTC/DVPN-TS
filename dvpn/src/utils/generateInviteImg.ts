



export function generateInvitation(QRcanvas: HTMLCanvasElement | null) {
    if(!QRcanvas)return

    const posterWrapper = document.createElement("div")
    
}


function setOverallStyle(poster: HTMLDivElement){
    poster.style.position = "fixed"
    poster.style.top = "-9999px"
    poster.style.width = "1080px"
    poster.style.height = "1920px"
    poster.style.display = "flex"
    poster.style.flexDirection = "column"
    poster.style.backgroundImage = "url('./image/QRcodeBackg.png')";
}