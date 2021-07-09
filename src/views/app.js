
const categories = document.getElementById('categories')
const templateAccordion = document.getElementById('template-accordion').content
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
const fragmentTwo = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    getCategoriesWithProducts()
})

const getProducts = async () => {
    try {
        const res = await fetch('http://localhost:3000/products')
        const data = await res.json()

    } catch (error) {
        console.log('Error', error)
    }
}

const getCategoriesWithProducts = async () => {
    try {
        const res = await fetch('http://localhost:3000/categories/group')
        const { result } = await res.json()

        drawAccordions(result)
    } catch (error) {
        console.log('Error', error)
    }
}

const drawAccordions = (data) => {

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
            templateCard.querySelector('h5').textContent = product.name
            templateCard.querySelector('h6').textContent = `$ ${product.price}`
            templateCard.querySelector('img').setAttribute('src', product.url_image ? product.url_image : './no-image.jpg')

            const clone = templateCard.cloneNode(true)
            fragmentTwo.appendChild(clone)
        })

        products.appendChild(fragmentTwo)
    })


}