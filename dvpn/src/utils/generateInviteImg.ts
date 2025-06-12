import html2canvas from "html2canvas";

export function generateInvitationImg(element: HTMLDivElement | null) {
    if(!element)return

    html2canvas(element,{
        useCORS: true,
        allowTaint: false,
        scale: 2
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = imgData;
        link.download = "invitation.png";
        link.click();
    });
}

