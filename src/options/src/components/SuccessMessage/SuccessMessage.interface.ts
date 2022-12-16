export default interface SuccessMessageProps {
    show?: boolean;
    text: string;
    time?: number;
    bg?: string;
    darkBg?: string;
    onClose: (flag: boolean) => void;
}