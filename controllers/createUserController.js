import { userServices } from "../servicios/user-services.js";

const form = document.querySelector('[data-form]')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('[data-name]').value,
        email = document.querySelector('[data-email]').value,
        pass = document.querySelector('[data-password]').value
    
    userServices.createUser(name, email, pass).then(response => {
        if(response.ok)
            window.location.href = './../screens/users.html'

        Swal.fire({
            title: "¡Genial!",
            text: "Usuario agregado con éxito.",
            icon: "success",
            confirmButtonText: "Ok",
            timer: 2000,
            timerProgressBar: true,
        })
    })
    .catch((error) => {
        Swal.fire({
            title: "¡Upps!, hubo un error",
            text: error,
            icon: 'error',
            confirmButtonText: "Ok"
        })
    })
})