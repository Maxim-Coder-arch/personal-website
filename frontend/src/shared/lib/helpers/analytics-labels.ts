const UNKNOWN_KEY = "Unknown";
const UNKNOWN_LABEL = "Неизвестно";

interface DeviceInfo {
    deviceType: string;
    deviceBrand?: string | null;
    deviceModel?: string | null;
}

export const DEVICE_LABELS: Record<string, string> = {
    desktop: "Компьютер",
    mobile: "Телефон",
    tablet: "Планшет",
};

export const REFERRER_LABELS: Record<string, string> = {
    direct: "Прямой заход",
};

export const translateKey = (key: string, dictionary?: Record<string, string>) => {
    if (key === UNKNOWN_KEY) return UNKNOWN_LABEL;

    return dictionary?.[key.toLowerCase()] ?? key;
};

export const getDeviceLabel = (type: string) => translateKey(type, DEVICE_LABELS);

export const getDeviceTitle = ({ deviceType, deviceBrand, deviceModel }: DeviceInfo) => {
    const model = [deviceBrand, deviceModel].filter(Boolean).join(" ");
    const type = getDeviceLabel(deviceType);

    return model ? `${type} · ${model}` : type;
};