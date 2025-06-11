

export function downloadDVPN() {
    const link = document.createElement('a');
    link.href = './fdroid/release/dvpn-fdroid_arm64-v8a.apk';
    link.download = 'D-VPN.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}