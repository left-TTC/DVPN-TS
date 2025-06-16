

export enum DeviceType{
    Phone,
    Computer,
    QR,
}


export function checkWhatDevice(): DeviceType{
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
        return DeviceType.Phone;
    } else if(screenWidth < 1550){
        return DeviceType.QR
    }else{
        return DeviceType.Computer
    }
}