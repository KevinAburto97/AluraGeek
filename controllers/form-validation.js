const formData = document.querySelector("#form__data"),
    formName = document.querySelector("#contact__nombre"),
    formMensaje = document.querySelector("#contact__mensaje")

document.addEventListener("DOMContentLoaded", () => {
    formData.addEventListener('submit', validarFormulario)
})

function validarFormulario(event){
    event.preventDefault()

    let nombre = formName.value,
        mensaje = formMensaje.value
    if(nombre.length > 40){
        Swal.fire({
            title: "Error al digitar el nombre",
            text: 'Puede contener un máximo de 40 caracteres',
            icon: 'error',
            confirmButtonText: "Continuar"
        })
        return
    }

    if(mensaje > 120 ){
        Swal.fire({
            title: "Error en el mensaje",
            text: 'Puede contener un máximo de 120 caracteres',
            icon: 'error',
            confirmButtonText: "Continuar"
        })
        return
    }
    this.submit()
}