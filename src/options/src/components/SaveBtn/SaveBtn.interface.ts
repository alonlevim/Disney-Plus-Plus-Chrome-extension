export default interface SaveBtnProps {
    label: string;
    loading?: boolean;
    textLoading: string;
    disabled?: boolean;
    rtl?: boolean;
    onClick?: () => void;
}