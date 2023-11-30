export const TODAY = () => {
    const date = new Date();
    const options = { timeZone: 'America/Mexico_City' };
    const localeDate = date.toLocaleString('es-MX', options);
    const output = localeDate.slice(6, 10) + '-' + localeDate.slice(3, 5) + '-' + localeDate.slice(0, 2)
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
}