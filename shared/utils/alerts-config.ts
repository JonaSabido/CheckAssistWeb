import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const ToastShowCode = Swal.mixin({
    customClass: {
        confirmButton: 'button-save mx-auto',
        title: 'text-center jakarta color-primary-900',
        popup: 'fw-bold jakarta fs-6'

    },
    position: 'center',
    showConfirmButton: true,
    confirmButtonColor: '#2003af',
    confirmButtonText: 'Aceptar',
    
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const Confirm = Swal.mixin({
    customClass: {
        confirmButton: 'button-delete',
        cancelButton: 'button-return me-2',
        title: 'jakarta'
    },
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    focusCancel: false,
    focusConfirm: false
});


export const SwalAlert = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-light-danger'
    },
    buttonsStyling: false
});

