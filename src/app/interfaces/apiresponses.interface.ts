export interface List<T> {
    success: boolean,
    data: T[]
    message: string
}

export interface OnlyEntity<T> {
    success: boolean,
    data: T
    message: string
}

export interface Exists {
    exists: boolean
}