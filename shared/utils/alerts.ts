import { Toast, ToastShowCode } from "./alerts-config"

export const AlertSaveSuccess = (timer: number = 3000) => Toast.fire({
    icon: 'success',
    title: 'Guardado correctamente',
    timer: timer
})

export const AlertSaveError = () => Toast.fire({
    icon: 'error',
    title: 'Error al guardar'
})

export const AlertDeleteSuccess = () => Toast.fire({
    icon: 'success',
    title: 'Eliminado correctamente'
})

export const AlertDeleteError = () => Toast.fire({
    icon: 'error',
    title: 'Error al eliminar'
})

export const AlertChangeStatusSuccess = () => Toast.fire({
    icon: 'success',
    title: 'Status modificado correctamente'
})

export const AlertChangeStatusError = () => Toast.fire({
    icon: 'error',
    title: 'Error al modificar el status'
})

export const AlertShowCode = (code_meeting: string) => ToastShowCode.fire({
    title: code_meeting,
    text: '¡Código de acceso para tu evento!',
})