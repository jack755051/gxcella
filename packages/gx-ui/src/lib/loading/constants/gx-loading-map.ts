import {GxLoadingSize, GxLoadingSpeed} from "../model/gx-loading.type";

export const SIZE_MAP: Record<GxLoadingSize, number> = {
    sm: 24,
    md: 40,
    lg: 56,
};

export const GAP_MAP: Record<GxLoadingSize, number> = {
    sm: 4,
    md: 8,
    lg: 10,
};

export const DUR_MAP: Record<GxLoadingSpeed, string> = {
    slow: "1.2s",
    normal: "0.8s",
    fast: "0.5s",
};

export const RADIUS_RATIO = 0.15;