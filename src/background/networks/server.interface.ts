export interface Languages {
    ui?: string;
    subtitle?: string;
    audio?: string;
    rtl?: boolean;
}

export interface LanguagesAndCountry extends Languages {
    country: string;
}

export interface Report {
    fullName: string;
    email: string;
    subject: string;
    message: string;
    createdOn: string;
    flags: string;
}

export interface ReportResponse {
    status: string;
}