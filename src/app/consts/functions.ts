export function PROPERTIES_FILLED(obj: Record<string, any>): boolean {
    for (const property in obj) {
        if (obj[property] === null || obj[property] === '') {
            return false;
        }
    }
    return true;
}