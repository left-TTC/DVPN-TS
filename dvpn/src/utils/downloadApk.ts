export async function downloadDVPN() {
    try {
        const response = await fetch('./fdroid/release/dvpn-fdroid_arm64-v8a.apk');
        const blob = await response.blob();

        const url = window.URL.createObjectURL(
        new Blob([blob], { type: 'application/vnd.android.package-archive' })
        );

        const link = document.createElement('a');
        link.href = url;
        link.download = 'D-VPN.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('APK 下载失败:', error);
    }
}
