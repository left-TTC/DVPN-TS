


export function readVersionCode(): string | null {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', './fdroid/release/output-metadata.json', false); // 第三个参数为 false 表示同步请求
    xhr.send();

    if (xhr.status === 200) {
        try {
            const data = JSON.parse(xhr.responseText);

            if (data.elements && data.elements.length > 0) {
                const versionName = data.elements[0].versionName;
                return versionName; 
            } else {
                return null
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null
        }
    } else {
        console.error('Failed to load JSON file:', xhr.statusText);
        return null
    }
}