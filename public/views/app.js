

const btnSearch = document.getElementById("btnSearch")
const fieldSearch = document.getElementById("fieldSearch")
const categories = document.getElementById('categories')
const templateAccordion = document.getElementById('template-accordion').content
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
const fragmentTwo = document.createDocumentFragment();

const url = 'http://localhost:3000/'

document.addEventListener('DOMContentLoaded', () => {
    getCategoriesWithProducts()
})

btnSearch.addEventListener('click', () => {
    const filter = fieldSearch.value
    getCategoriesWithProducts(filter)
})

fieldSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const filter = fieldSearch.value
        getCategoriesWithProducts(filter)

    }
})

const getProducts = async () => {
    try {
        const res = await fetch('http://localhost:3000/products')
        const data = await res.json()

    } catch (error) {
        console.log('Error', error)
    }
}

const getCategoriesWithProducts = async (filter) => {
    try {
        const query = filter ? `?filter=${filter}` : ''
        const res = await fetch(url + 'categories/group' + query)
        const { result } = await res.json()

        drawAccordions(result)
    } catch (error) {
        console.log('Error', error)
    }
}

const drawAccordions = (data) => {
    categories.innerHTML = ''
    data.map(category => {
        templateAccordion.querySelector('h4').textContent = category.name.toUpperCase()
        templateAccordion.querySelector('#btn-accordion').setAttribute('data-bs-target', `#flush-${category.id}`);
        templateAccordion.querySelector('.flush').setAttribute('id', `flush-${category.id}`);
        templateAccordion.querySelector('.accordion-body').setAttribute('id', `products-${category.id}`);

        const clone = templateAccordion.cloneNode(true)

        fragment.appendChild(clone)
    })

    categories.appendChild(fragment)
    drawCards(data)
}

const drawCards = (data) => {
    data.map(category => {
        const products = document.getElementById(`products-${category.id}`)
        products.innerHTML = ''
        category.products.map(product => {
            templateCard.querySelector('span').textContent = `Descuento: ${product.discount}%`
            templateCard.querySelector('h5').textContent = product.name
            templateCard.querySelector('h6').textContent = `$ ${product.price}`
            templateCard.querySelector('img').setAttribute('src', product.url_image ? product.url_image : './no-image.jpg')

            const clone = templateCard.cloneNode(true)
            fragmentTwo.appendChild(clone)
        })

        products.appendChild(fragmentTwo)
    })


}