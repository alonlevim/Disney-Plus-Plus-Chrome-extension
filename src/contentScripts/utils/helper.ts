export const fromUrlToItemId = (url: string): string | null => {
    try {
        const values = url.split("/watch")[0].split("/");

            return values[values.length - 1];
    } catch (error) {
        return null;
    }
}