export const TODAY = () => {
    const date = new Date();
    const options = { timeZone: 'America/Mexico_City' };
    const localeDate = date.toLocaleString('es-MX', options);

    const adjustedLocaleDate = /^\d{2}/.test(localeDate) ? localeDate : '0' + localeDate;

    const day = adjustedLocaleDate.slice(0, 2);
    const month = adjustedLocaleDate.slice(3, 5);
    const year = adjustedLocaleDate.slice(6, 10);

    const output = year + '-' + month + '-' + day;
    return output;
}

export const DIFFERENCE_BETWEEN_TWO_DATES = (first_date: string, second_date: string) => {
    const parseFirstDate = new Date(first_date).getTime()
    const parseSecondDate = new Date(second_date).getTime()

    const majorDate = parseFirstDate > parseSecondDate ? parseFirstDate : parseSecondDate
    const lessDate = parseFirstDate < parseSecondDate ? parseFirstDate : parseSecondDate

    const diff = majorDate - lessDate

    return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export const CHECKUSER_STATUS = {
    OnlyStart: 'Entrada registrada',
    Completed: 'Completada',
    Canceled: 'Cancelada'
} as const;

export type CheckUserStatusValues = typeof CHECKUSER_STATUS[keyof typeof CHECKUSER_STATUS];