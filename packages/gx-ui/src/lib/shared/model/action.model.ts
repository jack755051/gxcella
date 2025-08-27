export interface GxAction {
    label: string;
    handler?: () => void;
    disabled?: boolean;
}