export const cutString = (str: string): string => {
    if (str.length > 20) {
        str = str.slice(0, 20) + '...';
    }
    return str
}