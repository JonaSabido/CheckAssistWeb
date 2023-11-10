export const TODAY = new Date().toISOString().slice(0, 10)

export const DIFFERENCE_BETWEEN_TWO_DATES = (first_date: string, second_date: string) => {
    const parseFirstDate = new Date(first_date).getTime()
    const parseSecondDate = new Date(second_date).getTime()

    const majorDate = parseFirstDate > parseSecondDate ? parseFirstDate : parseSecondDate
    const lessDate = parseFirstDate < parseSecondDate ? parseFirstDate : parseSecondDate

    const diff = majorDate - lessDate

    return Math.floor(diff / (1000 * 60 * 60 * 24))
}