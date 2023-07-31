const listaUsuarios = () => fetch('http://localhost:3000/users').then(response => response.json())

const createUser = (name, email, password) => {
    return fetch(`http://localhost:3000/users/`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name, email, password, id: uuid.v4()})
    }).then(response => {
        if(response.ok)
            return response.ok

        throw new Error('No fue posible crear un usuario')

    })
}

const detalleUser = (id) => {
    return fetch(`http://localhost:3000/users/${id}`).then((response) => response.json())
}

const deleteUser = (id) => {
    return fetch(`http://localhost:3000/users/${id}`,{
        method: 'DELETE'
    })
}

const updateUser = (name, email, password, id) => {
    return fetch(`http://localhost:3000/users/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({name, email, password})
    }).then(response => response)
    .catch(error => console.log(error))
}

export const userServices = {
    listaUsuarios,
    createUser,
    detalleUser,
    deleteUser,
    updateUser
}