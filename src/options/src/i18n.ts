import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json';
import he from './locales/he.json';
import ar from './locales/ar.json';
import { LANGUAGE } from './storage.constant';

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
    he: {
        translation: he,
    },
};

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources,
    });

const changeLanguage = (data: any) => {
    if (typeof data?.[LANGUAGE] === "string" && data[LANGUAGE].length) {
        i18next.changeLanguage(data[LANGUAGE].length > 2 ? data[LANGUAGE].substring(0, 2) : data[LANGUAGE]);
    }
};

// langguage by web application
chrome?.storage?.sync?.get([LANGUAGE])
    .then(changeLanguage);

export default i18next;