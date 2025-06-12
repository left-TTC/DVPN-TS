
import { getQueryVariable } from "@/utils/getQueryVariable";

export class JsonD {
    serve: string[];
    invitationCodes : string;

    constructor(data: string){
        const res = JSON.parse(decodeURIComponent(data));
        this.serve = res.serve;
        this.invitationCodes = res.inv;
    }
}

// example:
// serveL http://ipfs.is/cid/
// invitationcodes: fanmocheng
// combination: http://ipfs.is/cid/?r=fanmocheng

//test: http://192.168.10.12:5173/invite?j=%7B%22serve%22%3A%5B%22http%3A%2F%2F192.168.1.36%3A5173%2F%22%2C%22http%3A%2F%2Fipfs.io%2F%22%5D%2C%22inv%22%3A%22fmc%22%7D
// 😚😚🎉 You're invited to try a 📦brand-new Android app🚀!
// 😎😎 Discover content you've never 🫣seen before and experience a new way to 🌊surf the web🕸!
// 📲😖 If the link can't open directly, please copy and paste it into your browser.
// 👻👻 And if one link doesn't work, try the others. 
// 👉 http://192.168.1.36:5173/?r=fmc
// 👉 https://ipfs.io/ipfs/bafybeigf5rq5s5cs4ef5kpvfexkpirijdqeb5skyfuoiuezf5odnc75c5y/#/invite?r=fmc

export async function generateInvitationLink(invitationSub: string): Promise<boolean> {
    const invitationCode = getQueryVariable('j');
    console.log("links invitationCode:", invitationCode)
    if (!invitationCode){
        return false
    };

    const urlParams = new JsonD(invitationCode);
    // urlParams.serve[1] = "https://ipfs.io/ipfs/bafybeigf5rq5s5cs4ef5kpvfexkpirijdqeb5skyfuoiuezf5odnc75c5y/" 

    const invitationCodes = urlParams.invitationCodes;

    let links: string = "";
    for(const serve of urlParams.serve){
        if(urlParams.serve.indexOf(serve) === 0){
            links = invitationSub + serve + '#/?r=' + invitationCodes
        }else{
            links += '\n' + '👉 ' +  serve + '#/?r=' +  invitationCodes
        }
    }

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(links);
        } else {
            // Fallback for older browsers or insecure context
            const textArea = document.createElement("textarea");
            textArea.value = links;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (!successful) throw new Error("Fallback copy failed");
        }

        return true;
    } catch (err) {
        console.error("copy error:", err);
        return false;
    }
}
