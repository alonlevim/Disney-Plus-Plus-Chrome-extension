export default interface SaveBtnProps {
    label: string;
    loading?: boolean;
    textLoading: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
    onClick?: () => void;
}