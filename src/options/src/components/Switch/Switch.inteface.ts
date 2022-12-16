export default interface SwitchProps {
    label: string;
    disabled?: boolean;
    checked?: boolean;
    nigthMode?: boolean;
    rtl?: boolean;
    onChange?: (flag: boolean) => void;
}