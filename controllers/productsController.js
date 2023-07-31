import { productosServicios } from "../servicios/productos-servicios.js"
export const nuevoProducto = (name, price, imageUrl, id) => {
    var pathImg = './'
    const currentPagePath = window.location.href,
    currentFolderPath = currentPagePath.substring(0, currentPagePath.lastIndexOf("/") + 1)

    if(currentFolderPath.indexOf('screens') !== -1)
        pathImg = './../'

    const contenido = `
    <div class="product__card-edit hidden ">
        <button class="btnDelete" type="button"><img src="${pathImg}assets/img/icons/delete.svg" alt="edition_icon" class="iconEdit" data-delete></button>
        <a href="${pathImg}screens/edit-products.html?id=${id}"><img src="${pathImg}assets/img/icons/edit.svg" alt="edition_icon" class="iconEdit" data-edit></a>
    </div>
    <div class="imgContainer">
        <img class="product__card--img" src="${imageUrl}" alt="imagen_del_producto">
    </div>
    <div class="product__card--info">
        <p class="product__card--title">${name}</p>
        <p class="product__card--price">${price}</p>
        <a href="${pathImg}screens/viewProducts.html?id=${id}"  class="product__card-boton" data-verProducto>Ver producto</a>
    </div>
    `,
    card = document.createElement('div')
    card.setAttribute('data-product', name)
    card.innerHTML = contenido
    card.classList.add('product__card')

    const deleteBtn = card.querySelector('.btnDelete')
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
                if(result.isConfirmed){
                    Swal.fire(
                        '¡Genial!',
                        'El registrado fue eliminado con éxito',
                        'success'
                    )
                    productosServicios.deleteProducto(id)
                    .then(() => {
                        render();
                    })
                    .catch((err) => {
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

    return card;
}

const products = document.querySelector('[data-starWarsCategory]'),
    consolas = document.querySelector('[data-consolasCategory]'),
    diversos = document.querySelector('[data-diversosCategory]'),
    admin = document.querySelector('[data-adminProducts]');

const render = async () => {
    try{
        const allProducts = await productosServicios.listaProductos();
        if(admin){
            admin.innerHTML = '';
            allProducts.forEach(productos => {
                admin.appendChild(nuevoProducto(productos.name, productos.price, productos.imageUrl, productos.id))
            })
        }
        if(products){
            products.innerHTML = '';
            allProducts.filter(product => product.category === 'StarWars').forEach(item => {
                products.appendChild(nuevoProducto(item.name, item.price, item.imageUrl, item.id))
            })
        }
        if(consolas){
            consolas.innerHTML = '';
            allProducts.filter(consola => consola.category === 'Consolas').forEach(item => {
                consolas.appendChild(nuevoProducto(item.name, item.price, item.imageUrl, item.id))
            })
        }
        if(diversos){
            diversos.innerHTML = '';
            allProducts.filter(diverso => diverso.category === 'Diversos').forEach(item => {
                diversos.appendChild(nuevoProducto(item.name, item.price, item.imageUrl, item.id))
            })
        }
    }
    catch(error){
        Swal.fire({
            title: "Hubo un error",
            text: error,
            icon: 'error',
            confirmButtonText: "Ok"
        })
    }
}

render()