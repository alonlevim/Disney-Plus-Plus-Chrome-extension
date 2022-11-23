export default function(...data: any) {
    window.debug = process.env.DEBUG === "true";
    if( process.env.DEBUG === "true" ) {
        console.log(...data);
    }
}
