import { MOVIES, SHOWS, WATCH } from "../pages/pagesConstants";
import { catchError } from "./handleError";

interface PageAndCountry {
    country: string;
    page: string;
    rest: string;
    watching: boolean;
}

const getPageAndCountry = (): PageAndCountry  => {
    try {
        const path = window.location.pathname.split("/");
        
        if( path.length && path[0].trim() === "" ) {
            path.shift();
        }

        if( path.includes(MOVIES) || path.includes(SHOWS) ) {
            return {
                country: path[0],
                page: path[1],
                rest: path.slice(2).join("/"),
                watching: path.slice(2).includes(WATCH),
            };
        } else {
            return {
                country: path[0],
                page: path.slice(1).join("/"),
                watching: false,
                rest: "",
            };
        }
    } catch (error) {
        catchError(error);
        return {
            country: "",
            page: "",
            watching: false,
            rest: "",
        };
    }
 };

export default getPageAndCountry;