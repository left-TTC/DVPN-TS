



export function turnToLinks(links: string) {
    console.log("ready for:", links)
    const link = document.createElement("a");
    link.href = links;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}