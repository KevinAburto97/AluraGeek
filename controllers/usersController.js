import { userServices } from "../servicios/user-services.js";
const user = document.querySelector("[data-tableUsers"),
        nuevoUsuario = (name, email, password, id) => {
            const addUser = document.createElement("tr")
            addUser.innerHTML = `
                <td class="td">${name}</td>
                <td>${email}</td>
                <td>${password}</td>
                <td>
                    <ul class="table__button-control">
                        <li>
                            <a href='./../screens/edit-user.html?id=${id}' class='simple-button simple-button--edit btn' data-editUser><img class='icon' src='./../assets/img/icons/edit-user.svg' alt='Icono Editar'></a>
                        </li>
                        <li>
                            <button class='simple-button simple-button--delete btn' type='button' id='${id}' data-deleteUser><img class='icon' src='./../assets/img/icons/delete-user.svg' alt='Icono Eliminar'></button>
                        </li>
                    </ul>
                </td>
            `;

            const deleteBtn = addUser.querySelector('[data-deleteUser]')
            deleteBtn.addEventListener('click', () => {
                if(id){
                    Swal.fire({
                        title: '¿Estás seguro de eliminar este registro?',
                        text: "¡No podrás deshacer los cambios!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText:'Cancelar',
                        confirmButtonText: 'Si, eliminar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                                Swal.fire(
                                    '¡Genial!',
                                    'El registrado fue eliminado con éxito',
                                    'success'
                                )
                                userServices.deleteUser(id)
                                .then((id) => {
                                    render()
                                })
                                .catch((error) => {
                                Swal.fire({
                                    title: "Hubo un error",
                                    text: error,
                                    icon: 'error',
                                    confirmButtonText: "Ok"
                                })
                            })
                        }
                    })
                }
            })

            return addUser
        }


const render = async () => {
    try {
        const listaUsuarios = await userServices.listaUsuarios()
        if(user){
            user.innerHTML = ''
            listaUsuarios.forEach((item) => {
                user.append(nuevoUsuario(item.name, item.email, item.password, item.id))
            })
        }
    } catch (error) {
        Swal.fire({
            title: "Hubo un error",
            text: error,
            icon: 'error',
            confirmButtonText: "Ok"
        })
    }
}

render()