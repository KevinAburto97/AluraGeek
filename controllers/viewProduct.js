import { productosServicios } from "../servicios/productos-servicios.js";
import { nuevoProducto } from "./productsController.js";

const imgProduct = document.querySelector('[data-img]'),
    nameProduct = document.querySelector('[data-name]'),
    priceProduct = document.querySelector('[data-price]'),
    descProduct = document.querySelector('[data-description]'),
    url = new URL(window.location),
    id = url.searchParams.get('id')

const getData = async (id) => {
    try{
        const product = await productosServicios.detalleProducto(id)
        imgProduct.src = product.imageUrl
        nameProduct.textContent = product.nameProduct
        priceProduct.textContent = `Precio: ${product.price}`
        descProduct.textContent = `Descripción del Producto: ${product.description}`

        console.log({product, id});

        const products = await productosServicios.listaProductos(),
        allProducts = document.querySelector('[data-products]')

        allProducts.innerHTML = '';
        products.filter(prod => prod.categoria === product.categoria).forEach(item => {
            allProducts.appendChild((nuevoProducto(item.name, item.price, item.imageUrl, item.id)));
        });
    }
    catch (error){
        console.log("Hubo un Error", error);
    }
}

if(id){
    getData(id);
}