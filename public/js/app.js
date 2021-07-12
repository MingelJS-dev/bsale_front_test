const btnSearch = document.getElementById("btnSearch")
const fieldSearch = document.getElementById("fieldSearch")
const categories = document.getElementById('categories')
const templateAccordion = document.getElementById('template-accordion').content
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
const fragmentTwo = document.createDocumentFragment();

const url = 'https://bsale-back19.herokuapp.com/'

document.addEventListener('DOMContentLoaded', () => {
    getCategoriesWithProducts()
})

btnSearch.addEventListener('click', () => {
    const filter = fieldSearch.value
    const show = fieldSearch.value ? true : false
    getCategoriesWithProducts(filter, show)
})

fieldSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const filter = fieldSearch.value
        const show = fieldSearch.value ? true : false
        getCategoriesWithProducts(filter, show)

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

const getCategoriesWithProducts = async (filter, show = false) => {
    try {
        const query = filter ? `?filter=${filter}` : ''
        const res = await fetch(url + 'categories/group' + query)
        const { result } = await res.json()

        drawAccordions(result, show)
    } catch (error) {
        console.log('Error', error)
    }
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1
});

const getDiscountPrice = ({ discount, price }) => {
    const percentage = (100 - discount) / 100

    return formatter.format(percentage * price)
}



const drawAccordions = (data, show ) => {
    categories.innerHTML = ''
    const CategoryId = data[0].id
    console.log(CategoryId, show)
    data.map((category, idx) => {
        templateAccordion.querySelector('h4').textContent = category.name.toUpperCase()
        templateAccordion.querySelector('#btn-accordion').setAttribute('data-bs-target', `#flush-${category.id}`);
        templateAccordion.querySelector('.flush').setAttribute('id', `flush-${category.id}`);
        templateAccordion.querySelector('.accordion-body').setAttribute('id', `products-${category.id}`);
        if (CategoryId === category.id && show) {
            templateAccordion.querySelector('.flush').setAttribute('class', `flush accordion-collapse collapse show`);
        } else {
            templateAccordion.querySelector('.flush').setAttribute('class', `flush accordion-collapse collapse`);
        }

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

            if (product.discount > 0) {
                templateCard.querySelector('.discount').style.opacity = `1`
                templateCard.querySelector('span').textContent = `-${product.discount}%`
                templateCard.getElementById('price').textContent = getDiscountPrice(product)
                templateCard.querySelector('h6').style.textDecoration = 'line-through'
            } else {
                templateCard.querySelector('.discount').style.opacity = `0`
                templateCard.querySelector('span').textContent = ''
                templateCard.querySelector('h6').style.textDecoration = ''
                templateCard.getElementById('price').textContent = ''
            }

            templateCard.querySelector('h5').textContent = product.name
            templateCard.querySelector('h6').textContent = formatter.format(product.price)
            templateCard.querySelector('img').setAttribute('src', product.url_image ? product.url_image : './assets/no-image.jpg')

            const clone = templateCard.cloneNode(true)
            fragmentTwo.appendChild(clone)
        })

        products.appendChild(fragmentTwo)
    })


}