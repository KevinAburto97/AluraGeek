const listaProductos = () => fetch('http://localhost:3000/productos/')
                            .then(response => response.json())
                            .catch(error => console.log(error))

const crearProducto = (imageUrl, name, price, category, description) => {
    return fetch(`http://localhost:3000/productos/`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            imageUrl, name, price, category, description, id: uuid.v4()
        })
    })
    .then(response => {
        if(response.ok)
            return response.body

        throw new Error('No fue posible crear un producto')
    })
}

const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then((response) => response.json() )
}

const deleteProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`,{
        method: "DELETE"
    })
}

const updateProducto = (imageUrl, name, price, category, description, id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            imageUrl,
            name,
            price,
            category,
            description
        })
    }).then(response => response)
    .catch(error => console.log(error))
}

export const productosServicios = {
    listaProductos,
    crearProducto,
    detalleProducto,
    updateProducto,
    deleteProducto
}