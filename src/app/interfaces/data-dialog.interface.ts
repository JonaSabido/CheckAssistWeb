export interface DataDialog<T> {
    model: T
    type: 'create' | 'edit' | 'only-view'
}