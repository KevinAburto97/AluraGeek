import { userServices } from "../servicios/user-services.js";

const form = document.querySelector('[data-form]'),
    nombre = document.querySelector('[data-nombre]'),
    email = document.querySelector('[data-email]'),
    password = document.querySelector('[data-password]'),
    url = new URL(window.location),
    id = url.searchParams.get('id')

const getInfo = async () => {
    try{
        const user = await userServices.detalleUser(id)
        nombre.value = user.name
        email.value = user.email
        password.value = user.password
    }
    catch(error){
        Swal.fire({
            title: "¡Upps!, hubo un error",
            text: error,
            icon: 'error',
            confirmButtonText: "Ok"
        })
    }
}

if(id){
    getInfo()
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        userServices.updateUser(nombre.value, email.value, password.value, id).then((response) => {
            if(response.ok){
                Swal.fire({
                    title: "¡Genial!",
                    text: "Usuario actualizado con éxito.",
                    icon: "success",
                    confirmButtonText: "Ok",
                    timer: 2000,
                    timerProgressBar: true,
                })

                window.location.href = './../screens/users.html'
            }

        })
    })
}
else{
    Swal.fire({
        title: "¡Upps!, hubo un error",
        text: "No se encontró el ID del usuario",
        icon: 'error',
        confirmButtonText: "Ok"
    })
}
