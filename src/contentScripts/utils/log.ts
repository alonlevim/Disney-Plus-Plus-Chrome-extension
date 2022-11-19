export default function(...data: any) {
    if( process.env.DEBUG ) {
        console.log(...data);
    }
}