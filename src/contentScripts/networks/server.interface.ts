export interface Languages {
    ui?: string;
    subtitle?: string;
    audio?: string;
    rtl?: boolean;
}

export interface LanguagesAndCountry extends Languages {
    country: string;
}