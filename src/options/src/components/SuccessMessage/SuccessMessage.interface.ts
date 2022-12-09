export default interface SuccessMessageProps {
    show?: boolean;
    text: string;
    rtl?: boolean;
    onClose: (flag: boolean) => void;
}