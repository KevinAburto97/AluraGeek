import { productosServicios } from "../servicios/productos-servicios.js";

const form = document.querySelector('[data-form]')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.querySelector('[data-name]').value,
        url = document.querySelector('[data-url]').value,
        price = document.querySelector('[data-price]').value,
        description = document.querySelector('[data-description]').value,
        category = document.querySelector('[data-category]')

    const [selectedCategory] = [].filter
    .call(category.options, option => option.selected)
    .map(option => option.text)

    productosServicios.crearProducto(url, name, price, selectedCategory, description)
    .then(response => {
        alert('El producto fue creado con éxito.')
        window.location.href = '../screens/adminProducts.html'
    })
    .catch(err => console.log(err))

})