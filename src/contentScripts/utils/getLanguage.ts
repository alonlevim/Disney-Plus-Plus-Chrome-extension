import Cookie from 'js-cookie';

const SUBTITLE_PATH = "__VIDEO_PREFERENCE_SUBTITLE_66fb9ebb7587440fafaef6a68a86a277";
const AUDIO_PATH = "__VIDEO_PREFERENCE_AUDIO_66fb9ebb7587440fafaef6a68a86a277";
const UI_PATH = "SELECTED__LANGUAGE";

export const getUILang = (): string => Cookie.get(UI_PATH);

export const getSubtitleLang = (): string|undefined => {
    const item = localStorage.getItem(SUBTITLE_PATH);
    
    if(!item) {
        return undefined;
    }

    try {
        const data = JSON.parse(item);
        if( data?.value?.feature === "subtitle" ) {
            return data?.value?.iso3code;
        }
    } catch (error) {
        return undefined;
    }

    return undefined;
}

export const getAudioLang = (): string|undefined => {
    const stringData = localStorage.getItem(AUDIO_PATH);
    if(!stringData) {
        return undefined;
    }

    try {
        const data = JSON.parse(stringData);
        const langMap = {} as {[lang: string]: number;};

        if( Array.isArray(data.value) ) {
            for( const item of data.value ) {
                if( item?.value?.iso3code ) {
                    if( typeof langMap[item?.value?.iso3code] === "undefined" ) {
                        langMap[item?.value?.iso3code] = 0;
                    }

                    langMap[item?.value?.iso3code]++;
                }
            }
        }

        const values = Object.values(langMap);
        if( values.length === 0 ) {
            return undefined;
        }
        else if( values.length < 2 ) {
            return Object.keys(langMap)[0];
        }

        const max = Math.max(...values);
        const index = values.indexOf(max);

        return Object.keys(langMap)[index];
    } catch (error) {
        return undefined;
    }
}

export const isRtl = (): boolean => document.body.getAttribute("dir") === "rtl";