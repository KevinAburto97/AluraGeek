const container = document.getElementById('search__container'),
    search = document.getElementById('search__items'),
    action = document.getElementById('search__action')

let products = []

setInterval(() => {
    products = Array.from(document.querySelectorAll('[data-product]'))
}, 1000/5)

const update = () => {
    const value = search.value.toLowerCase()
    for (const product of products){
        const name = (product.getAttribute('data-product') || '').toLowerCase().trim()

        product.style.display = !value || !name || name.includes(value) ? 'flex' : 'none'
    }
}

search.addEventListener('input', update)
search.addEventListener('change', update)