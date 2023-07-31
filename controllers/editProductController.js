import { productosServicios } from "../servicios/productos-servicios.js";

const form = document.querySelector('[data-form]'),
    imgUrl = document.querySelector('[data-url]'),
    nombre = document.querySelector('[data-nombre]'),
    precio = document.querySelector('[data-precio]'),
    description = document.querySelector('[data-description]'),
    categroy = document.querySelector('[data-category]'),
    url = new URL(window.location),
    id = url.searchParams.get('id')

const getInfo = async () => {
    try{
        const product = await productosServicios.detalleProducto(id)

        imgUrl.value = product.imageUrl
        nombre.value = product.name
        precio.value = product.price
        description.value = product.description
        categroy.value = product.categroy
    }
    catch(error){
        alert("Hubo un Error: " + error)
    }
}

if(id){
    getInfo()

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        productosServicios.updateProducto(imgUrl.value, nombre.value, precio.value, categroy.value, description.value, id).then((response) => {
            if(response.ok){
                window.location.href = './../screens/adminProducts.html'
            }
            Swal.fire({
                title: "¡Genial!",
                text: "Producto actualizado con éxito.",
                icon: "success",
                confirmButtonText: "Ok",
                timer: 2000,
                timerProgressBar: true,
            })
            /*.then((result) => {
                console.log(result)
                //if (result.dismiss === Swal.DismissReason.timer)
                    //window.location.href = 'screens/adminProducts'
            })*/
        })
    })
}
else{
    alert("Error, no se ha encontrado el id del producto seleccionado.")
}

